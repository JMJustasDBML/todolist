'use strict';

const React = require('react');
const ReactDom = require('react-dom');
const should = require('should');
const TestUtils = require('react/lib/ReactTestUtils');


const EntriesList = require('../../../src/client/js/components/EntriesList').default;
const Entry = require('../../../src/client/js/components/Entry').default;

describe('Tests for EntryList component', () => {
  it('should render entries', () => {
    const entries = [
      {id:'1', title:'title', completed: false},
      {id:'2', title:'title2', completed: false}
    ];
    const component = TestUtils
      .renderIntoDocument(<EntriesList entries={entries}/>);
    const renderedEntries = TestUtils
      .scryRenderedComponentsWithType(component, Entry);

    renderedEntries.length.should.equal(2);
  });

  it('should render only not completed entries', () => {
    const entries = [
      {id:'1', title:'title', completed: false},
      {id:'2', title:'title2', completed: true}
    ];
    const component = TestUtils
      .renderIntoDocument(<EntriesList entries={entries}/>);
    const renderedEntries = TestUtils
      .scryRenderedComponentsWithType(component, Entry);

    renderedEntries.length.should.equal(1);
  });

  it('should pass "complete" button events handler to child Entries', () => {
    const entries = [{id:'1', title:'title', completed: false}];
    const handler = function () {};

    const component = TestUtils
      .renderIntoDocument(<EntriesList entries={entries} onComplete={handler}/>);
    const renderedEntry = TestUtils
      .findRenderedComponentWithType(component, Entry);

    renderedEntry.props.onComplete.should.equal(handler);
  });

});
