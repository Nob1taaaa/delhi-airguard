import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocationContext } from '@/context/LocationContext';

interface LocationSearchProps {
    className?: string;
    variant?: 'default' | 'minimal';
}

const LocationSearch = ({ className = "", variant = 'default' }: LocationSearchProps) => {
    const { location, setLocation } = useLocationContext();
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setLocation(searchInput.trim());
            setSearchInput(""); // Clear input after search
        }
    };

    if (variant === 'minimal') {
        return (
            <form onSubmit={handleSearch} className={`flex items-center gap-2 ${className}`}>
                <div className="relative flex-1">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={location}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-9 w-[200px] bg-white"
                    />
                </div>
                <Button type="submit" size="icon" variant="secondary">
                    <Search className="h-4 w-4" />
                </Button>
            </form>
        );
    }

    return (
        <div className={`flex items-center gap-2 bg-white px-1 py-1 rounded-full border border-slate-200 shadow-sm ${className}`}>
            <MapPin size={16} className="text-blue-500 ml-2" />
            <form onSubmit={handleSearch} className="flex items-center">
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={location}
                    className="border-none shadow-none focus-visible:ring-0 h-8 w-40 bg-transparent"
                />
                <Button type="submit" size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    <Search size={14} />
                </Button>
            </form>
        </div>
    );
};

export default LocationSearch;
