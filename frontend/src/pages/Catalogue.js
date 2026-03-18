import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, X, SlidersHorizontal, BookOpen } from 'lucide-react';
import axios from 'axios';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Catalogue() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCat = searchParams.get('category') || 'all';

  const [products, setProducts]         = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch]             = useState('');
  const [selected, setSelected]         = useState(null);
  const [loading, setLoading]           = useState(true);

  /* fetch products */
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(data);
      } catch {
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  /* filter */
  const applyFilter = useCallback(() => {
    let list = products;
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.features || []).some(f => f.toLowerCase().includes(q))
      );
    }
    setFiltered(list);
  }, [products, activeCategory, search]);

  useEffect(() => { applyFilter(); }, [applyFilter]);

  /* keyboard close modal */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <main data-testid="catalogue-page" className="bg-[#050505] min-h-screen pt-20">
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="bg-[#080808] border-b border-[var(--dark-border)] py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-3">Complete Range</p>
            <h1 className="font-playfair text-4xl md:text-5xl text-white">
              Product <span className="text-gold">Catalogue</span>
            </h1>
            <span className="gold-line mt-4" />
          </div>
          <a
            href="/print"
            target="_blank"
            rel="noreferrer"
            data-testid="catalogue-print-btn"
            className="btn-gold no-print shrink-0"
          >
            <BookOpen size={15} />
            Print / PDF Catalogue
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* ── FILTERS ──────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8">
          {/* Category tabs */}
          <div data-testid="category-filters" className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                data-testid={`filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-manrope tracking-widest uppercase px-4 py-2 border transition-colors duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gold text-black border-gold'
                    : 'text-[#A3A3A3] border-[var(--dark-border)] hover:border-gold/50 hover:text-gold bg-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              data-testid="product-search-input"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#111] border border-[var(--dark-border)] text-white text-sm pl-9 pr-8 py-2.5 font-manrope placeholder:text-[#555] focus:outline-none focus:border-gold/50 transition-colors duration-300"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-gold transition-colors duration-300"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Product count */}
        <div className="flex items-center gap-2 mb-8">
          <SlidersHorizontal size={13} className="text-gold" />
          <span data-testid="product-count" className="text-xs text-[#A3A3A3] font-manrope">
            {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
          </span>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────────── */}
        {loading ? (
          <div data-testid="loading-state" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#111] aspect-[4/3] animate-pulse border border-[var(--dark-border)]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-testid="no-results" className="text-center py-20">
            <p className="font-playfair text-2xl text-[#555] mb-3">No products found</p>
            <p className="text-sm text-[#555] font-manrope">Try a different search or category.</p>
          </div>
        ) : (
          <div
            data-testid="product-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────────── */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
