import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({ pageContext }) => {

  const { previousPagePath, nextPagePath } = pageContext;
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <button>← Newer Posts</button>
          </Link>
        )}
      </div>

      <div style={{ justifySelf: 'flex-end' }}>
        {nextPagePath && (
          <Link to={nextPagePath}>
            <button>Older Posts →</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;