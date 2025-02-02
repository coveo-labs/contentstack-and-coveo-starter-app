import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { onEntryChange } from '../sdk/entry.d';

import RenderComponents from '../components/render-components';
import { getPageRes } from '../helper/index.d';
import Skeleton from 'react-loading-skeleton';
import { PageEntry, Prop } from "../typescript/pages";


export default function Home({ entry }: Prop) {

  const params = useParams();
  const entryUrl = params.page ? `/${params.page}` : '/';
  const history = useNavigate();
  const [getEntries, setEntries] = useState({} as PageEntry);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const result = await getPageRes(entryUrl);
      !result && setError(true);
      setEntries({ ...result });
      entry({ page: result });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  useEffect(() => {
    error && history('/404');
  }, [error]);

  useEffect(() => {
    if (getEntries.url !== entryUrl) {
      fetchData();
    }
  }, [getEntries, entryUrl]);

  return Object.keys(getEntries).length ? (
    <RenderComponents
      pageComponents={getEntries?.page_components}
      contentTypeUid='page'
      entryUid={getEntries?.uid}
      locale={getEntries?.locale}
    />
  ) : (
    <Skeleton count={5} height={400} />
  );
}
