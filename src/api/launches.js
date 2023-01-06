import axios from axios;

const baseUrl = 'https://api.spacexdata.com/v3';

const allLaunches = async () => {
    const url = `${baseUrl}/launches`;
    const response = await axios.get(url);
    console.log(response.data);
  };
  