using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace ErrorToFix.Analyzers;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class StringCompareAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule = new(
        DiagnosticIds.StringCompare,
        Resources.StringCompareTitle,
        Resources.StringCompareMessage,
        Resources.StringCompareCategory,
        DiagnosticSeverity.Info,
        isEnabledByDefault: true);

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeEquals, SyntaxKind.EqualsExpression);
    }

    private static void AnalyzeEquals(SyntaxNodeAnalysisContext context)
    {
        var binary = (BinaryExpressionSyntax)context.Node;

        var leftType = context.SemanticModel.GetTypeInfo(binary.Left, context.CancellationToken).Type;
        var rightType = context.SemanticModel.GetTypeInfo(binary.Right, context.CancellationToken).Type;

        if (leftType?.SpecialType != SpecialType.System_String && rightType?.SpecialType != SpecialType.System_String)
            return;

        // Only flag when one side is a string literal
        if (binary.Left is not LiteralExpressionSyntax && binary.Right is not LiteralExpressionSyntax)
            return;

        var diagnostic = Diagnostic.Create(Rule, binary.GetLocation(), binary.Left.ToString(), binary.Right.ToString());
        context.ReportDiagnostic(diagnostic);
    }
}
