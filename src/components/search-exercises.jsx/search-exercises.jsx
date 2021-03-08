import React, { useState } from 'react';
import { Input } from 'antd';

import CustomAutoComplete from '../antd/custom-inputs/custom-autocomplete';

import { searchExercises } from '../../api/wger';

import './search-exercises.css';


const SearchExercises = ({ setSelectedExerciseId  }) => {
    const [options, setOptions] = useState([]);

    const renderTitle = (title, count) => (
        <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                matches: {count}
            </span>
        </div>
    );
      
    const renderItem = (title, id) => ({
        value: title,
        key: id,
        label: (
            <span
            >
            {title}
            </span>
        ),
    });

    const handleSearch = async (term) => {
        if(term.length) {
            const searchResults = (await searchExercises(term)).suggestions;
            const exercisesByCategory = searchResults.reduce((exercisesByCategory, exercise) => {
                let key = exercise.data.category;
                if (!exercisesByCategory[key]) {
                    exercisesByCategory[key] = []
                }
                exercisesByCategory[key].push(exercise.data)
                return exercisesByCategory
            }, {});
            const options = Object.keys(exercisesByCategory).map(category => {
                return {
                    label: renderTitle(category, exercisesByCategory[category].length),
                    options: exercisesByCategory[category].map(e => renderItem(e.name, e.id))
                }
            });
            setOptions(options)
        }
    }
    
    return (
        <CustomAutoComplete dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={315}
            style={{width: 250}}
            onSearch={handleSearch}
            notFoundContent={"No exercise found"}
            onSelect={(value, option) => setSelectedExerciseId(option.key)}
            options={options}>
                    <Input.Search size="large" placeholder="Search Exercises" />
        </CustomAutoComplete>
    )
};

export default SearchExercises;