import React from 'react'

export const UserNameDisplay = () => {
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);
  
    return <p className="user-name">{username}</p>;
  };
  
   