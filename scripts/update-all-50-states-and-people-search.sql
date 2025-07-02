-- First, deactivate old entries to avoid duplicates
UPDATE public.search_engine_links 
SET active = false 
WHERE type = 'general' AND source_name LIKE '%Secretary of State%' OR source_name LIKE '%Division of%' OR source_name LIKE '%Department of%' OR source_name LIKE '%Corporation%';

-- Delete old individual search engines that we're replacing
DELETE FROM public.search_engine_links 
WHERE type = 'individual' AND source_name IN ('SearchPeopleFree', 'FastPeopleSearch', 'TruePeopleSearch', 'USPhonebooks', 'Radaris', 'Veripages', 'FastBackgroundCheck');

-- Insert all 50 state business entity search portals with working links
INSERT INTO public.search_engine_links (type, country, source_name, source_url, description, tags, state_codes, active) VALUES

-- Alabama
('general', 'USA', 'Alabama Secretary of State', 'https://arc-sos.state.al.us/cgi/corpname.mbr/input', 'Alabama business entity search portal', ARRAY['AL', 'business', 'corporate'], ARRAY['AL'], true),

-- Alaska
('general', 'USA', 'Alaska Division of Corporations', 'https://www.commerce.alaska.gov/cbp/main/search/entities', 'Alaska business entity search portal', ARRAY['AK', 'business', 'corporate'], ARRAY['AK'], true),

-- Arizona
('general', 'USA', 'Arizona Corporation Commission', 'https://ecorp.azcc.gov/EntitySearch/Index', 'Arizona business entity search portal', ARRAY['AZ', 'business', 'corporate'], ARRAY['AZ'], true),

-- Arkansas
('general', 'USA', 'Arkansas Secretary of State', 'https://www.sos.arkansas.gov/corps/search_all.php', 'Arkansas business entity search portal', ARRAY['AR', 'business', 'corporate'], ARRAY['AR'], true),

-- California
('general', 'USA', 'California Secretary of State', 'https://bizfileonline.sos.ca.gov/search/business', 'California business entity search portal', ARRAY['CA', 'business', 'corporate'], ARRAY['CA'], true),

-- Colorado
('general', 'USA', 'Colorado Secretary of State', 'https://www.sos.state.co.us/biz/BusinessEntitySearchCriteria.do', 'Colorado business entity search portal', ARRAY['CO', 'business', 'corporate'], ARRAY['CO'], true),

-- Connecticut
('general', 'USA', 'Connecticut Secretary of State', 'https://service.ct.gov/business/s/onlinebusinesssearch', 'Connecticut business entity search portal', ARRAY['CT', 'business', 'corporate'], ARRAY['CT'], true),

-- Delaware
('general', 'USA', 'Delaware Division of Corporations', 'https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx', 'Delaware business entity search portal', ARRAY['DE', 'business', 'corporate', 'incorporation'], ARRAY['DE'], true),

-- Florida
('general', 'USA', 'Florida Division of Corporations', 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName', 'Florida business entity search portal', ARRAY['FL', 'business', 'corporate'], ARRAY['FL'], true),

-- Georgia
('general', 'USA', 'Georgia Secretary of State', 'https://ecorp.sos.ga.gov/BusinessSearch', 'Georgia business entity search portal', ARRAY['GA', 'business', 'corporate'], ARRAY['GA'], true),

-- Hawaii
('general', 'USA', 'Hawaii Business Registration Division', 'https://hbe.ehawaii.gov/documents/search.html', 'Hawaii business entity search portal', ARRAY['HI', 'business', 'corporate'], ARRAY['HI'], true),

-- Idaho
('general', 'USA', 'Idaho Secretary of State', 'https://sosbiz.idaho.gov/search/business', 'Idaho business entity search portal', ARRAY['ID', 'business', 'corporate'], ARRAY['ID'], true),

-- Illinois
('general', 'USA', 'Illinois Secretary of State', 'https://www.ilsos.gov/corporatellc/', 'Illinois business entity search portal', ARRAY['IL', 'business', 'corporate'], ARRAY['IL'], true),

-- Indiana
('general', 'USA', 'Indiana Secretary of State', 'https://inbiz.in.gov/Inbiz/Search', 'Indiana business entity search portal', ARRAY['IN', 'business', 'corporate'], ARRAY['IN'], true),

-- Iowa
('general', 'USA', 'Iowa Secretary of State', 'https://sos.iowa.gov/search/business/search.aspx', 'Iowa business entity search portal', ARRAY['IA', 'business', 'corporate'], ARRAY['IA'], true),

-- Kansas
('general', 'USA', 'Kansas Secretary of State', 'https://www.kansas.gov/bess/flow/main?execution=e1s1', 'Kansas business entity search portal', ARRAY['KS', 'business', 'corporate'], ARRAY['KS'], true),

-- Kentucky
('general', 'USA', 'Kentucky Secretary of State', 'https://web.sos.ky.gov/bussearchnew/', 'Kentucky business entity search portal', ARRAY['KY', 'business', 'corporate'], ARRAY['KY'], true),

-- Louisiana
('general', 'USA', 'Louisiana Secretary of State', 'https://coraweb.sos.la.gov/CommercialSearch/CommercialSearchDetails.aspx', 'Louisiana business entity search portal', ARRAY['LA', 'business', 'corporate'], ARRAY['LA'], true),

-- Maine
('general', 'USA', 'Maine Secretary of State', 'https://icrs.informe.org/nei-sos-icrs/ICRS?MainPage=x', 'Maine business entity search portal', ARRAY['ME', 'business', 'corporate'], ARRAY['ME'], true),

-- Maryland
('general', 'USA', 'Maryland Department of Assessments', 'https://egov.maryland.gov/BusinessExpress/EntitySearch', 'Maryland business entity search portal', ARRAY['MD', 'business', 'corporate'], ARRAY['MD'], true),

-- Massachusetts
('general', 'USA', 'Massachusetts Secretary of State', 'https://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSearch.aspx', 'Massachusetts business entity search portal', ARRAY['MA', 'business', 'corporate'], ARRAY['MA'], true),

-- Michigan
('general', 'USA', 'Michigan Department of Licensing', 'https://cofs.lara.state.mi.us/SearchApi/Search/Search', 'Michigan business entity search portal', ARRAY['MI', 'business', 'corporate'], ARRAY['MI'], true),

-- Minnesota
('general', 'USA', 'Minnesota Secretary of State', 'https://mblsportal.sos.state.mn.us/Business/SearchDetails', 'Minnesota business entity search portal', ARRAY['MN', 'business', 'corporate'], ARRAY['MN'], true),

-- Mississippi
('general', 'USA', 'Mississippi Secretary of State', 'https://business.sos.ms.gov/corp/soskb/csearch.asp', 'Mississippi business entity search portal', ARRAY['MS', 'business', 'corporate'], ARRAY['MS'], true),

-- Missouri
('general', 'USA', 'Missouri Secretary of State', 'https://bsd.sos.mo.gov/BusinessEntity/BESearch.aspx?SearchType=0', 'Missouri business entity search portal', ARRAY['MO', 'business', 'corporate'], ARRAY['MO'], true),

-- Montana
('general', 'USA', 'Montana Secretary of State', 'https://biz.sosmt.gov/search/business', 'Montana business entity search portal', ARRAY['MT', 'business', 'corporate'], ARRAY['MT'], true),

-- Nebraska
('general', 'USA', 'Nebraska Secretary of State', 'https://www.nebraska.gov/sos/corp/corpsearch.cgi', 'Nebraska business entity search portal', ARRAY['NE', 'business', 'corporate'], ARRAY['NE'], true),

-- Nevada
('general', 'USA', 'Nevada Secretary of State', 'https://esos.nv.gov/EntitySearch/OnlineEntitySearch', 'Nevada business entity search portal', ARRAY['NV', 'business', 'corporate'], ARRAY['NV'], true),

-- New Hampshire
('general', 'USA', 'New Hampshire Secretary of State', 'https://quickstart.sos.nh.gov/online/BusinessInquire', 'New Hampshire business entity search portal', ARRAY['NH', 'business', 'corporate'], ARRAY['NH'], true),

-- New Jersey
('general', 'USA', 'New Jersey Division of Revenue', 'https://www.njportal.com/DOR/BusinessNameSearch', 'New Jersey business entity search portal', ARRAY['NJ', 'business', 'corporate'], ARRAY['NJ'], true),

-- New Mexico
('general', 'USA', 'New Mexico Secretary of State', 'https://portal.sos.state.nm.us/BFS/online/CorporationBusinessSearch', 'New Mexico business entity search portal', ARRAY['NM', 'business', 'corporate'], ARRAY['NM'], true),

-- New York
('general', 'USA', 'New York Department of State', 'https://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_SEARCH_ENTRY', 'New York business entity search portal', ARRAY['NY', 'business', 'corporate'], ARRAY['NY'], true),

-- North Carolina
('general', 'USA', 'North Carolina Secretary of State', 'https://www.sosnc.gov/online_services/search/by_title/_Business_Registration', 'North Carolina business entity search portal', ARRAY['NC', 'business', 'corporate'], ARRAY['NC'], true),

-- North Dakota
('general', 'USA', 'North Dakota Secretary of State', 'https://firststop.sos.nd.gov/search/business', 'North Dakota business entity search portal', ARRAY['ND', 'business', 'corporate'], ARRAY['ND'], true),

-- Ohio
('general', 'USA', 'Ohio Secretary of State', 'https://www5.sos.state.oh.us/ords/f?p=100:7:0::NO:7::', 'Ohio business entity search portal', ARRAY['OH', 'business', 'corporate'], ARRAY['OH'], true),

-- Oklahoma
('general', 'USA', 'Oklahoma Secretary of State', 'https://www.sos.ok.gov/corp/corpinquiryfind.aspx', 'Oklahoma business entity search portal', ARRAY['OK', 'business', 'corporate'], ARRAY['OK'], true),

-- Oregon
('general', 'USA', 'Oregon Secretary of State', 'https://sos.oregon.gov/business/pages/find.aspx', 'Oregon business entity search portal', ARRAY['OR', 'business', 'corporate'], ARRAY['OR'], true),

-- Pennsylvania
('general', 'USA', 'Pennsylvania Department of State', 'https://www.corporations.pa.gov/search/corpsearch', 'Pennsylvania business entity search portal', ARRAY['PA', 'business', 'corporate'], ARRAY['PA'], true),

-- Rhode Island
('general', 'USA', 'Rhode Island Secretary of State', 'https://business.sos.ri.gov/CorpWeb/CorpSearch/CorpSearch.aspx', 'Rhode Island business entity search portal', ARRAY['RI', 'business', 'corporate'], ARRAY['RI'], true),

-- South Carolina
('general', 'USA', 'South Carolina Secretary of State', 'https://businessfilings.sc.gov/BusinessFiling/Entity/Search', 'South Carolina business entity search portal', ARRAY['SC', 'business', 'corporate'], ARRAY['SC'], true),

-- South Dakota
('general', 'USA', 'South Dakota Secretary of State', 'https://sosenterprise.sd.gov/BusinessServices/Business/FilingSearch.aspx', 'South Dakota business entity search portal', ARRAY['SD', 'business', 'corporate'], ARRAY['SD'], true),

-- Tennessee
('general', 'USA', 'Tennessee Secretary of State', 'https://tnbear.tn.gov/Ecommerce/FilingSearch.aspx', 'Tennessee business entity search portal', ARRAY['TN', 'business', 'corporate'], ARRAY['TN'], true),

-- Texas
('general', 'USA', 'Texas Secretary of State', 'https://www.sos.state.tx.us/corp/sosda/index.shtml', 'Texas business entity search portal', ARRAY['TX', 'business', 'corporate'], ARRAY['TX'], true),

-- Utah
('general', 'USA', 'Utah Division of Corporations', 'https://secure.utah.gov/bes/', 'Utah business entity search portal', ARRAY['UT', 'business', 'corporate'], ARRAY['UT'], true),

-- Vermont
('general', 'USA', 'Vermont Secretary of State', 'https://bizfilings.vermont.gov/online/BusinessInquire', 'Vermont business entity search portal', ARRAY['VT', 'business', 'corporate'], ARRAY['VT'], true),

-- Virginia
('general', 'USA', 'Virginia State Corporation Commission', 'https://sccefile.scc.virginia.gov/Find/Business', 'Virginia business entity search portal', ARRAY['VA', 'business', 'corporate'], ARRAY['VA'], true),

-- Washington
('general', 'USA', 'Washington Secretary of State', 'https://ccfs.sos.wa.gov/#/BusinessSearch', 'Washington business entity search portal', ARRAY['WA', 'business', 'corporate'], ARRAY['WA'], true),

-- West Virginia
('general', 'USA', 'West Virginia Secretary of State', 'https://apps.sos.wv.gov/business/corporations/', 'West Virginia business entity search portal', ARRAY['WV', 'business', 'corporate'], ARRAY['WV'], true),

-- Wisconsin
('general', 'USA', 'Wisconsin Department of Financial Institutions', 'https://www.wdfi.org/apps/CorpSearch/Search.aspx', 'Wisconsin business entity search portal', ARRAY['WI', 'business', 'corporate'], ARRAY['WI'], true),

-- Wyoming
('general', 'USA', 'Wyoming Secretary of State', 'https://wyobiz.wy.gov/Business/FilingSearch.aspx', 'Wyoming business entity search portal', ARRAY['WY', 'business', 'corporate'], ARRAY['WY'], true),

-- Add the requested individual search engines
('individual', 'USA', 'SearchPeopleFree', 'https://www.searchpeoplefree.com/find/{name}', 'Free people search with basic contact information', ARRAY['people', 'free', 'contact'], NULL, true),

('individual', 'USA', 'FastPeopleSearch', 'https://www.fastpeoplesearch.com/name/{name}', 'Fast people search with address and phone lookup', ARRAY['people', 'fast', 'address', 'phone'], NULL, true),

('individual', 'USA', 'TruePeopleSearch', 'https://www.truepeoplesearch.com/results?name={name}&citystatezip={address}', 'Comprehensive free people search engine', ARRAY['people', 'free', 'comprehensive'], NULL, true),

('individual', 'USA', 'USPhonebooks', 'https://www.usphonebook.com/{name}', 'Phone number and address directory search', ARRAY['people', 'phone', 'directory'], NULL, true),

('individual', 'USA', 'Radaris', 'https://radaris.com/p/{name}/', 'People search with social media and background info', ARRAY['people', 'social', 'background'], NULL, true),

('individual', 'USA', 'Veripages', 'https://www.veripages.com/people/{name}', 'People verification and contact information', ARRAY['people', 'verification', 'contact'], NULL, true),

('individual', 'USA', 'FastBackgroundCheck', 'https://www.fastbackgroundcheck.com/people/{name}', 'Background check and people search service', ARRAY['people', 'background', 'verification'], NULL, true);

-- Update existing individual search engines with better URLs if needed
UPDATE public.search_engine_links 
SET 
  source_url = 'https://www.whitepages.com/name/{name}',
  description = 'Comprehensive people search with contact information and background data',
  active = true
WHERE source_name = 'WhitePages' AND type = 'individual';

UPDATE public.search_engine_links 
SET 
  source_url = 'https://www.spokeo.com/search?q={name}+{address}',
  description = 'People search with social media profiles and background information',
  active = true
WHERE source_name = 'Spokeo' AND type = 'individual';

UPDATE public.search_engine_links 
SET 
  source_url = 'https://www.beenverified.com/people/{name}',
  description = 'Professional background check and people search service',
  active = true
WHERE source_name = 'BeenVerified' AND type = 'individual';

UPDATE public.search_engine_links 
SET 
  source_url = 'https://www.intelius.com/people-search/{name}',
  description = 'People search with detailed background reports',
  active = true
WHERE source_name = 'Intelius' AND type = 'individual';

-- Add comment about the comprehensive update
COMMENT ON TABLE public.search_engine_links IS 'Updated with all 50 state Secretary of State portals and comprehensive people search engines - Last updated: 2024';
