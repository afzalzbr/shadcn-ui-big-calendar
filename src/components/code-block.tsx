"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

/**
 * CodeBlock Component
 *
 * Displays code snippets with syntax highlighting (basic), copy functionality,
 * and optional language/filename labels.
 */
export function CodeBlock({
  code,
  language = "typescript",
  fileName,
  showLineNumbers = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const lines = code.split("\n");

  return (
    <div className="relative group rounded-lg overflow-hidden border bg-muted/30">
      {(fileName || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            {fileName && (
              <span className="text-sm font-medium text-foreground">{fileName}</span>
            )}
            {language && !fileName && (
              <span className="text-xs text-muted-foreground uppercase">{language}</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}

      {!fileName && !language && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="absolute right-2 top-2 h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      )}

      <pre className="overflow-x-auto p-4">
        <code className="text-sm">
          {showLineNumbers ? (
            <div className="inline-block">
              {lines.map((line, index) => (
                <div key={index} className="table-row">
                  <span className="table-cell pr-4 text-right select-none text-muted-foreground/50">
                    {index + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </div>
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  );
}
