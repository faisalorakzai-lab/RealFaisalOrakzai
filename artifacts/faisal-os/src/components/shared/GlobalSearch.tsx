import { useEffect, useState } from "react";
import { useGlobalSearch } from "@workspace/api-client-react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, FileText, Briefcase, FileCode2, Newspaper } from "lucide-react";
import { useLocation } from "wouter";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: searchResults, isLoading } = useGlobalSearch({ q: query }, { query: { enabled: query.length > 2, queryKey: ['search', query] } });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'project': return <Briefcase className="mr-2 h-4 w-4" />;
      case 'article': return <FileText className="mr-2 h-4 w-4" />;
      case 'research': return <FileCode2 className="mr-2 h-4 w-4" />;
      case 'news': return <Newspaper className="mr-2 h-4 w-4" />;
      default: return <Search className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search OS.01..." value={query} onValueChange={setQuery} className="font-mono" />
      <CommandList>
        <CommandEmpty>{isLoading ? "Searching databanks..." : "No results found."}</CommandEmpty>
        {searchResults?.results && searchResults.results.length > 0 && (
          <CommandGroup heading="Global Results" className="font-mono text-xs">
            {searchResults.results.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => {
                  setOpen(false);
                  setLocation(result.url);
                }}
                className="py-3 cursor-pointer"
              >
                {getIcon(result.type)}
                <div className="flex flex-col">
                  <span className="font-sans font-medium">{result.title}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-xs">{result.excerpt}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
