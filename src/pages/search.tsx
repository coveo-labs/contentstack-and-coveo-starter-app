import React from "react";

import {
  AtomicResultLink,
  AtomicSearchInterface,
  AtomicResultList,
  buildSearchEngine,
  AtomicSearchBox,
  AtomicSearchBoxRecentQueries,
  AtomicSearchBoxQuerySuggestions,
  AtomicLayoutSection,
  AtomicFacetManager,
  AtomicFacet,
  AtomicPager,
  AtomicBreadbox,
  AtomicQuerySummary,
  AtomicResultSectionTitle,
  AtomicResultSectionExcerpt,
  AtomicResultText,
  AtomicSearchLayout,
  Result,
} from '@coveo/atomic-react';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthorTemplate = (props: any) => {
  const pic = `url(${props?.result?.raw?.picture})`;
  return (
    <div style={{backgroundImage: pic, backgroundRepeat: 'no-repeat', backgroundPosition: 'left', backgroundSize: 'contain', paddingLeft: '80px'}}>
      <AtomicResultSectionTitle>
        <AtomicResultLink />
      </AtomicResultSectionTitle>
      <AtomicResultSectionExcerpt>
        <AtomicResultText field="description" />
      </AtomicResultSectionExcerpt>
    </div>
  );
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogTemplate = (props: any) => {
  const pic = `linear-gradient(to right, rgba(250, 250, 250, 0.9), rgba(255, 255, 255, 0.9)), url(${props?.result?.raw?.picture})`;
  return (
    <div style={{background: pic , backgroundSize: 'cover, cover'}}>
      <AtomicResultSectionTitle>
        <AtomicResultLink />
      </AtomicResultSectionTitle>
      <AtomicResultSectionExcerpt>
        <AtomicResultText field="excerpt" />
      </AtomicResultSectionExcerpt>
    </div>
  );
};

const ResultTemplateHandler = (result: Result) => {
  if (result.raw.documenttype === 'Author') {
    return <AuthorTemplate result={result} />;
  }

  return <BlogTemplate result={result} />;
};


export default function Search() {
  const engine = buildSearchEngine({
    configuration: {
      accessToken: process.env.COVEO_ACCESS_TOKEN,
      organizationId: process.env.COVEO_ORGANIZATION_ID,
    },
  });

  return (

    <div className="home-advisor-section">
      <AtomicSearchInterface engine={engine} reflectStateInUrl={true} fieldsToInclude="author,authors,description,documenttype,picture,uid">
        <AtomicSearchLayout>
          <AtomicLayoutSection section="search">
            <AtomicSearchBox>
              <AtomicSearchBoxRecentQueries maxWithQuery={0} maxWithoutQuery={0} />
              <AtomicSearchBoxQuerySuggestions
                maxWithQuery={5}
                maxWithoutQuery={5}
              />
            </AtomicSearchBox>
          </AtomicLayoutSection>

          <AtomicLayoutSection section="facets">
            <AtomicFacetManager>
              <AtomicFacet facetId="documenttype" field="documenttype" label="Document Type"></AtomicFacet>
              <AtomicFacet facetId="author" field="author" label="Author"></AtomicFacet>
            </AtomicFacetManager>
          </AtomicLayoutSection>

          <AtomicLayoutSection section="main">

            <AtomicLayoutSection section="status">
              <AtomicBreadbox />
              <AtomicQuerySummary />
            </AtomicLayoutSection>

            <AtomicLayoutSection section="results">
              <AtomicResultList display="grid" template={ResultTemplateHandler} />
            </AtomicLayoutSection>

            <AtomicLayoutSection section="pagination">
              <AtomicPager />
            </AtomicLayoutSection>

          </AtomicLayoutSection>
        </AtomicSearchLayout>
      </AtomicSearchInterface>
    </div>
  );
}
