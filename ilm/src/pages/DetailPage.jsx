import React, { useEffect, useState } from 'react'
import axios from 'axios'
import xml2js from "xml-js";

const DetailPage = () => {
    const [data, setData] = useState(null)
    const key = 'GdRq2wNf3V%2B2XaFCdCiLBhB7feMP3tA7no5CvoII9Mo2QkabR0cQCFR5fGsCxsphvnXhAhy8XnLX1Ep9EYT4HQ%3D%3D'

    useEffect(() => {
        axios
        .get(`https://apis.data.go.kr/B553457/nopenapi/rest/publicperformancedisplays/detail?serviceKey=${key}&seq=282960`, {
            responseType: 'text'
        })
        .then((response) => {
            const result = xml2js.xml2js(response.data, { compact: true, spaces: 4 });
            const jsonData = JSON.parse(JSON.stringify(result));
            setData(jsonData);
        })
        .catch(function(error) {
            console.log(error);
        });
    }, []);

    return (
        <div>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default DetailPage
