import React, { useEffect, useState } from 'react'
import axios from 'axios';
import xml2js from 'xml-js';

const GetData = (num) => {
    const [data, setData] = useState(null);
    const key = 'GdRq2wNf3V%2B2XaFCdCiLBhB7feMP3tA7no5CvoII9Mo2QkabR0cQCFR5fGsCxsphvnXhAhy8XnLX1Ep9EYT4HQ%3D%3D';

    useEffect(() => {
        axios
            .get(`https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/detail?serviceKey=${key}&seq=${num}`, {
                responseType: 'text'
            })
            .then((response) => {
                const result = xml2js.xml2js(response.data, { compact: true });
                const jsonData = result.response.body.items.item;
                const parsedData = Object.keys(jsonData).reduce((acc, key) => {
                    acc[key] = jsonData[key]._text || jsonData[key];
                    return acc;
                }, {});
                setData(parsedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
  return (
    <div>{data}</div>
  )
}

export default GetData