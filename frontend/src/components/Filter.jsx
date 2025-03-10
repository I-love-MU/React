import React from 'react';

const Filter = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div>
            <label>장르:</label>
            <select name="genre" onChange={handleFilterChange}>
                <option value="">전체</option>
                <option value="comedy">코미디</option>
                <option value="drama">드라마</option>
            </select>

            <label>지역:</label>
            <select name="location" onChange={handleFilterChange}>
                <option value="">전체</option>
                <option value="seoul">서울</option>
                <option value="busan">부산</option>
            </select>

            <label>날짜:</label>
            <input type="date" name="date" onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;
