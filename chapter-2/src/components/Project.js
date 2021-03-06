import { useState, useEffect } from 'react';
import List from './List';
import Link from './Link';
import { useParams } from 'react-router-dom';

function Project({ userName }) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://api.github.com/repos/${userName}/${name}`,
      );
      const result = await data.json();

      if (result) {
        setProject(result);
        setLoading(false);
      }
    }

    if (userName && name) {
      fetchData();
    }
  }, [userName, name]);

  const items = [
    {
      field: 'html_url',
      value: <Link url={project.html_url} title={project.html_url} />,
    },
    {
      field: 'description',
      value: project.description,
    },
    {
      field: 'created_at',
      value: project.created_at,
    },
  ];

  return (
    <div className='Project-container'>
      <h2>Project: {project.name}</h2>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <List items={items} />
        </div>
      )}
    </div>
  );
}

export default Project;
