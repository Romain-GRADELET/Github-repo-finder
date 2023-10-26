import PropTypes from 'prop-types';
import { Form, Input, Segment } from 'semantic-ui-react';

function SearchBar({ search, setSearch, getRepositories }) {
  const segmentStyle = {
    marginTop: '1.5rem',
  };

  // Autre option pour le style
  // <Segment style={{ marginTop: '1.5rem' }}>
  return (
    <Segment style={segmentStyle}>
      <Form onSubmit={(event) => {
        event.preventDefault();
        getRepositories();
      }}
      >
        <Input
          required
          fluid
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          search={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </Form>
    </Segment>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
};

export default SearchBar;
