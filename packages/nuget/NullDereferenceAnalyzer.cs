using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace ErrorToFix.Analyzers;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class NullDereferenceAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule = new(
        DiagnosticIds.NullDereference,
        Resources.NullDereferenceTitle,
        Resources.NullDereferenceMessage,
        Resources.NullDereferenceCategory,
        DiagnosticSeverity.Warning,
        isEnabledByDefault: true);

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSyntaxNodeAction(AnalyzeMemberAccess, SyntaxKind.SimpleMemberAccessExpression);
    }

    private static void AnalyzeMemberAccess(SyntaxNodeAnalysisContext context)
    {
        var memberAccess = (MemberAccessExpressionSyntax)context.Node;

        // Check if the expression being accessed is a result of an 'as' cast
        if (memberAccess.Expression is not ParenthesizedExpressionSyntax { Expression: BinaryExpressionSyntax binary })
            return;

        if (!binary.IsKind(SyntaxKind.AsExpression))
            return;

        // The result of 'as' can be null — flag it
        var diagnostic = Diagnostic.Create(Rule, memberAccess.GetLocation(), binary.Left.ToString());
        context.ReportDiagnostic(diagnostic);
    }
}
