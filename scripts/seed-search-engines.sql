-- Insert sample search engine links
INSERT INTO public.search_engine_links (type, country, source_name, source_url, tags) VALUES
-- Individual search engines
('individual', 'USA', 'WhitePages', 'https://www.whitepages.com/name/{name}', ARRAY['people', 'general']),
('individual', 'USA', 'Spokeo', 'https://www.spokeo.com/search?q={name}', ARRAY['people', 'general']),
('individual', 'USA', 'BeenVerified', 'https://www.beenverified.com/people/{name}', ARRAY['people', 'background']),
('individual', 'USA', 'TruePeopleSearch', 'https://www.truepeoplesearch.com/results?name={name}', ARRAY['people', 'free']),

-- General company search engines
('general', 'USA', 'California Secretary of State', 'https://bizfileonline.sos.ca.gov/search/business', ARRAY['CA', 'business']),
('general', 'USA', 'Delaware Division of Corporations', 'https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx', ARRAY['DE', 'business']),
('general', 'USA', 'New York Department of State', 'https://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_SEARCH_ENTRY', ARRAY['NY', 'business']),
('general', 'USA', 'Texas Secretary of State', 'https://mycpa.cpa.state.tx.us/coa/', ARRAY['TX', 'business']),
('general', 'USA', 'Florida Division of Corporations', 'https://search.sunbiz.org/Inquiry/CorporationSearch/ByName', ARRAY['FL', 'business']),

-- Foundation search engines
('foundation', 'USA', 'IRS Tax Exempt Organization Search', 'https://apps.irs.gov/app/eos/allSearch', ARRAY['IRS', 'nonprofit', 'foundation']),
('foundation', 'USA', 'GuideStar', 'https://www.guidestar.org/search', ARRAY['nonprofit', 'charity']),
('foundation', 'USA', 'Charity Navigator', 'https://www.charitynavigator.org/index.cfm?bay=search.summary', ARRAY['nonprofit', 'charity']),

-- Investment Advisory search engines
('investment_advisory', 'USA', 'SEC Investment Adviser Public Disclosure', 'https://www.adviserinfo.sec.gov/search/genericsearch/grid', ARRAY['SEC', 'investment', 'advisory']),
('investment_advisory', 'USA', 'FINRA BrokerCheck', 'https://brokercheck.finra.org/', ARRAY['FINRA', 'broker', 'investment']);
