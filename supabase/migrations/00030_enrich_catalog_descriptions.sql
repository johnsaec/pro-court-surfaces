-- Migration: Enrich services_catalog descriptions with product/spec language
--
-- Names the actual products (Acrytech / AT Sports, Acrylock, Laykold, Acrytech
-- Solvent Primer) and installation specifics, mirroring the hand-built proposals.
-- These descriptions flow onto every quote line item via service.description in
-- scripts/quotes/quote-build.mjs (and lineItemFromService in the app builder).
--
-- Apply via the Supabase dashboard SQL editor (CLI not linked).

UPDATE services_catalog SET description = 'Full-surface diamond grind to remove laitance and curing compounds, open the concrete surface profile (CSP), and establish a coatable substrate. Includes dust control and debris removal.' WHERE code = 'diamond-grind';

UPDATE services_catalog SET description = 'Wash, degrease, and prep a smooth, hard-troweled slab (no grind) — used beneath cushioned systems that require a smooth substrate.' WHERE code = 'smooth-pad-prep-no-grind';

UPDATE services_catalog SET description = 'One coat of acrylic bonding primer (Acrylock latex, or Acrytech Solvent Primer on uncoated slabs) rolled across the full surface to lock the coating system to the concrete. Solvent primer includes the required 3''x3'' adhesion verification test per manufacturer TDS.' WHERE code = 'adhesion-promoter';

UPDATE services_catalog SET description = 'One squeegee coat of black sand-filled Laykold acrylic resurfacer to build the base layer and fill surface texture.' WHERE code = 'acrylic-resurfacer-black';

UPDATE services_catalog SET description = 'Two color layers of Laykold 100% acrylic, sand-loaded surfacing in the selected court colors, installed to manufacturer technical specification.' WHERE code = 'laykold-color-coats-2';

UPDATE services_catalog SET description = 'Multiple squeegee-applied coats of the Cushion X rubberized cushion system, built up for uniform shock absorption and forgiving footing.' WHERE code = 'cushion-x-base';

UPDATE services_catalog SET description = 'Two coats of 100% acrylic, sand-loaded color surfacing in the selected court colors, installed to manufacturer technical specification.' WHERE code = 'acrylic-color-coats';

UPDATE services_catalog SET description = 'Layout and paint of regulation pickleball lines (2" textured white line paint, machine cut and masked), including the non-volley zone (kitchen).' WHERE code = 'pickleball-striping';

UPDATE services_catalog SET description = 'Cleaning, routing as needed, and filling of existing surface cracks up to 3/8" wide with Acrytech Sport Patch, applied after primer per manufacturer sequence.' WHERE code = 'crack-repair-standard';

UPDATE services_catalog SET description = 'ATS Sports Faultline glue-and-roll structural patch system over existing cracks, an upgrade to standard rout-and-fill.' WHERE code = 'ats-faultline-repair';

UPDATE services_catalog SET description = 'Grind and remove the existing acrylic/coating system down to bare concrete to establish a fresh coatable substrate.' WHERE code = 'full-strip-to-concrete';

UPDATE services_catalog SET description = 'Pressure wash the full playing surface, vacuum and rinse, and allow to fully dry ahead of coating.' WHERE code = 'pressure-washing';
