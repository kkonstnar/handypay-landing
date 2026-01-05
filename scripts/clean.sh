#!/bin/bash

# Clean script for Next.js project
# Removes build caches and optionally node_modules

echo "🧹 Cleaning project caches..."

# Remove Next.js build cache
if [ -d ".next" ]; then
    rm -rf .next
    echo "✓ Removed .next/"
fi

# Remove Turbopack cache
if [ -d ".turbo" ]; then
    rm -rf .turbo
    echo "✓ Removed .turbo/"
fi

# Remove node_modules cache
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "✓ Removed node_modules/.cache/"
fi

# Remove TypeScript build info
if [ -f "tsconfig.tsbuildinfo" ]; then
    rm -f tsconfig.tsbuildinfo
    echo "✓ Removed tsconfig.tsbuildinfo"
fi

echo ""
echo "✅ Cache clean complete!"

# Check for --full flag to also remove node_modules
if [ "$1" == "--full" ]; then
    echo ""
    echo "🗑️  Removing node_modules (this frees the most space)..."
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        echo "✓ Removed node_modules/"
    fi
    echo ""
    echo "✅ Full clean complete!"
    echo "Run 'pnpm install' then 'pnpm dev' to start fresh."
else
    echo ""
    echo "💡 To also remove node_modules (frees ~500MB+), run:"
    echo "   pnpm clean:full"
    echo ""
    echo "💡 To clear global pnpm cache, run:"
    echo "   pnpm store prune"
fi
