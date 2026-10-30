import axios from 'axios';

export const getActor = async () => {
  //const { data } = await axios.get(`http://jsonplaceholder.typicode.com/todos`);
  const { data } = await axios({
    method: 'GET',
    url: `http://jsonplaceholder.typicode.com/todos`,
  });
  
  return data;
}

export const getActorId = async (id) => {
   /*  const { data } = await axios
               .get(`http://jsonplaceholder.typicode.com/todos/${id}`); */
       const { data } = await axios({
            method: 'GET',
            url: `http://jsonplaceholder.typicode.com/todos/${id}`,
            params: {
                id: id
            }
        });
    return data;
}