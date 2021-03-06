const React = require('react');
const PropTypes = require('prop-types');
const showCodeResults = require('./lib/show-code-results');

// const { replaceVars } = require('./lib/replace-vars');
const syntaxHighlighter = require('@readme/syntax-highlighter');
const extensions = require('@readme/oas-extensions');

const ExampleTabs = require('./ExampleTabs');

const Oas = require('./lib/Oas');

const { Operation } = Oas;

function Example({ operation, result, oas, selected, setExampleTab, exampleResponses }) {
  const examples = exampleResponses.length ? exampleResponses : showCodeResults(operation);
  const hasExamples = examples.find(e => e.code && e.code !== '{}');
  return (
    <div className="hub-reference-results-examples code-sample">
      {examples &&
      examples.length > 0 &&
      hasExamples && (
        <span>
          <ExampleTabs examples={examples} selected={selected} setExampleTab={setExampleTab} />
          <div className="code-sample-body">
            {examples.map((example, index) => {
              return (
                <pre
                  className={`tomorrow-night tabber-body tabber-body-${index}`}
                  style={{ display: index === selected ? 'block' : '' }}
                  key={index} // eslint-disable-line react/no-array-index-key
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlighter(example.code, example.language, true),
                  }}
                />
              );
            })}
          </div>
        </span>
      )}
      {(examples.length === 0 || (!hasExamples && result === null)) && (
        <div className="hub-no-code">
          {oas[extensions.EXPLORER_ENABLED] ? (
            'Try the API to see Results'
          ) : (
            'No response examples available'
          )}
        </div>
      )}
    </div>
  );
}

module.exports = Example;

Example.propTypes = {
  result: PropTypes.shape({}),
  oas: PropTypes.instanceOf(Oas).isRequired,
  operation: PropTypes.instanceOf(Operation).isRequired,
  selected: PropTypes.number.isRequired,
  setExampleTab: PropTypes.func.isRequired,
  exampleResponses: PropTypes.arrayOf(PropTypes.shape({})),
};

Example.defaultProps = {
  result: {},
  exampleResponses: [],
};
