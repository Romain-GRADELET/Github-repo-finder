import PropTypes from 'prop-types';
import { Card, Image, Segment } from 'semantic-ui-react';

function Repositories({ repositories }) {
  return (
    <Segment>
      <Card.Group itemsPerRow={3}>
        {repositories.map((repository) => (
          <Card key={repository.id}>
            <Image src={repository.owner.avatar_url} wrapped ui={false} />
            <Card.Content>
              <Card.Header><a href={repository.html_url} target="_blank" rel="noreferrer">{repository.name}</a></Card.Header>
              <Card.Meta><a href={repository.owner.html_url} target="_blank" rel="noreferrer">{repository.owner.login}</a></Card.Meta>
              <Card.Description>{repository.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Segment>
  );
}

Repositories.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default Repositories;
