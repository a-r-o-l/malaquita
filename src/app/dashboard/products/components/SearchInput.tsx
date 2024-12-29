"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      router.push(`/dashboard/products?${params.toString()}`);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, router]);

  return (
    <div className="relative">
      <Input
        name="search"
        placeholder="Buscar producto"
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.currentTarget.value)}
      />
      {searchQuery === "" ? (
        <Search className="absolute top-1/2 right-2 transform -translate-y-1/2 text-muted-foreground w-4" />
      ) : (
        <Button
          variant="ghost"
          className="rounded-full absolute top-1/2 right-0 transform -translate-y-1/2 text-muted-foreground w-4"
          onClick={() => setSearchQuery("")}
        >
          <X />
        </Button>
      )}
    </div>
  );
}

export default SearchInput;
