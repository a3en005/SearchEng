-- Insert comprehensive search engine links
INSERT INTO public.search_engine_links (type, country, source_name, source_url, description, tags, state_codes) VALUES

-- Individual/People Search Engines
('individual', 'USA', 'WhitePages', 'https://www.whitepages.com/name/{name}', 'Comprehensive people search with contact information', ARRAY['people', 'contact', 'phone'], NULL),
('individual', 'USA', 'Spokeo', 'https://www.spokeo.com/search?q={name}+{address}', 'People search with social media and background info', ARRAY['people', 'social', 'background'], NULL),
('individual', 'USA', 'BeenVerified', 'https://www.beenverified.com/people/{name}', 'Background check and people search service', ARRAY['people', 'background', 'criminal'], NULL),
('individual', 'USA', 'TruePeopleSearch', 'https://www.truepeoplesearch.com/results?name={name}&citystatezip={address}', 'Free people search engine', ARRAY['people', 'free', 'contact'], NULL),
('individual', 'USA', 'Intelius', 'https://www.intelius.com/people-search/{name}', 'People search with detailed background reports', ARRAY['people', 'background', 'detailed'], NULL),

-- General Business/Company Search Engines by State
('general', 'USA', 'California Secretary of State', 'https://bizfileonline.sos.ca.gov/search/business', 'California business entity search', ARRAY['business', 'corporate'], ARRAY['CA']),
('general', 'USA', 'Delaware Division of Corporations', 'https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx', 'Delaware corporate entity search', ARRAY['business', 'corporate', 'incorporation'], ARRAY['DE']),
('general', 'USA', 'New York Department of State', 'https://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_SEARCH_ENTRY', 'New York business entity search', ARRAY['business', 'corporate'], ARRAY['NY']),
('general', 'USA', 'Texas Secretary of State', 'https://www.sos.state.tx.us/corp/sosda/index.shtml', 'Texas business entity search', ARRAY['business', 'corporate'], ARRAY['TX']),
('general', 'USA', 'Florida Division of Corporations', 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName', 'Florida business entity search', ARRAY['business', 'corporate'], ARRAY['FL']),
('general', 'USA', 'Illinois Secretary of State', 'https://www.ilsos.gov/corporatellc/', 'Illinois business entity search', ARRAY['business', 'corporate'], ARRAY['IL']),
('general', 'USA', 'Pennsylvania Department of State', 'https://www.corporations.pa.gov/search/corpsearch', 'Pennsylvania business entity search', ARRAY['business', 'corporate'], ARRAY['PA']),
('general', 'USA', 'Ohio Secretary of State', 'https://www5.sos.state.oh.us/ords/f?p=100:7:0::NO:7::', 'Ohio business entity search', ARRAY['business', 'corporate'], ARRAY['OH']),
('general', 'USA', 'Georgia Secretary of State', 'https://ecorp.sos.ga.gov/BusinessSearch', 'Georgia business entity search', ARRAY['business', 'corporate'], ARRAY['GA']),
('general', 'USA', 'Virginia State Corporation Commission', 'https://sccefile.scc.virginia.gov/Find/Business', 'Virginia business entity search', ARRAY['business', 'corporate'], ARRAY['VA']),

-- Foundation/Nonprofit Search Engines
('foundation', 'USA', 'IRS Tax Exempt Organization Search', 'https://apps.irs.gov/app/eos/allSearch', 'Official IRS database of tax-exempt organizations', ARRAY['IRS', 'nonprofit', 'tax-exempt', 'official'], NULL),
('foundation', 'USA', 'GuideStar', 'https://www.guidestar.org/search', 'Comprehensive nonprofit organization database', ARRAY['nonprofit', 'charity', 'financial'], NULL),
('foundation', 'USA', 'Charity Navigator', 'https://www.charitynavigator.org/index.cfm?bay=search.summary', 'Charity ratings and financial information', ARRAY['nonprofit', 'charity', 'ratings'], NULL),
('foundation', 'USA', 'Foundation Directory Online', 'https://fconline.foundationcenter.org/', 'Foundation and grant maker database', ARRAY['foundation', 'grants', 'funding'], NULL),

-- Investment Advisory Search Engines
('investment_advisory', 'USA', 'SEC Investment Adviser Public Disclosure', 'https://www.adviserinfo.sec.gov/search/genericsearch/grid', 'Official SEC database of investment advisers', ARRAY['SEC', 'investment', 'advisory', 'official'], NULL),
('investment_advisory', 'USA', 'FINRA BrokerCheck', 'https://brokercheck.finra.org/', 'FINRA broker and investment adviser search', ARRAY['FINRA', 'broker', 'investment', 'official'], NULL),
('investment_advisory', 'USA', 'IAPD - Investment Adviser Public Disclosure', 'https://www.adviserinfo.sec.gov/IAPD/Default.aspx', 'Detailed investment adviser public disclosure', ARRAY['SEC', 'IAPD', 'investment', 'detailed'], NULL);

-- Update the active status for all inserted records
UPDATE public.search_engine_links SET active = true WHERE active IS NULL;

-- Add comment
COMMENT ON TABLE public.search_engine_links IS 'Seeded with comprehensive search engines for all supported types';
