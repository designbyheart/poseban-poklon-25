<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://posebanpoklon.rs/</loc>
    </url>
    @foreach($products as $product)
        <url>
            <loc>{{"https://posebanpoklon.rs/pokloni/".$product}}</loc>
        </url>
    @endforeach
    @foreach($categories as $category)
        <url>
            <loc>{{"https://posebanpoklon.rs/kategorije/".$category}}</loc>
        </url>
    @endforeach
    <url>
        <loc>https://posebanpoklon.rs/kontaktiraj-nas</loc>
    </url>
    <url>
        <loc>https://posebanpoklon.rs/garancije</loc>
    </url>
    @foreach($pages as $page)
        <url>
            <loc>{{"https://posebanpoklon.rs/".$page}}</loc>
        </url>
    @endforeach
</urlset>
