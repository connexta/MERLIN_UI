import * as React from 'react';
import Header from '../src/components/Header'
import FlexLayoutManager from '../src/FlexLayoutManager';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

export default function Index() {
  return (<Wrapper><Header /><FlexLayoutManager /></Wrapper>)
}
