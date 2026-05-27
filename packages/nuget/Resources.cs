namespace ErrorToFix.Analyzers;

public static class Resources
{
    public const string NullDereferenceTitle = "Possible null dereference";
    public const string NullDereferenceMessage = "'{0}' may be null when accessed. Add a null check before dereferencing.";
    public const string NullDereferenceCategory = "Reliability";

    public const string EmptyCatchTitle = "Empty catch block";
    public const string EmptyCatchMessage = "Empty catch block swallows exceptions silently. Log or handle the exception.";
    public const string EmptyCatchCategory = "Reliability";

    public const string StringCompareTitle = "Use string.Equals for comparison";
    public const string StringCompareMessage = "Use string.Equals(\"{0}\", \"{1}\", StringComparison.Ordinal) instead of == for explicit comparison semantics";
    public const string StringCompareCategory = "Performance";
}
