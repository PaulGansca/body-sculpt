import React, { useState } from 'react';
import { Input } from 'antd';

import CustomTable from '../antd/custom-table/custom-table';

import { searchExercises, getExerciseInfo } from '../../api/wger';

import './search-exercises.css';

const columns = [
    {
      title: 'Exercise',
      dataIndex: 'name',
      render: (text) => <em style={{fontWeight: 'bold'}}>{text}</em>,
    },
];

const SearchExercises = ({ setSelectedExerciseId  }) => {
    const [searchResults, setSearchResults] = useState([]);
    //const [exercisesByCategory, setExercisesByCategory] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => setSelectedExerciseId(selectedRowKeys),
        getCheckboxProps: (record) => ({
          name: record.name,
          record
        }),
      };

    const handleSearch = async (term) => {
        setExpandedKeys([])
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
            //setExercisesByCategory(exercisesByCategory)
            setSearchResults(searchResults.map(s => s.data))
        }
    }
    
    return (
        <>
            <Input.Search placeholder="Search Exercises" onChange={e => handleSearch(e.target.value)} />
            <CustomTable
                columns={columns}
                rowKey={exercise => exercise.id}
                rowSelection={{...rowSelection, type: 'radio'}}
                dataSource={searchResults}
                showHeader={false}
                expandable={{
                    onExpand: async (expanded, record) => {
                        if(expanded) {
                            const exercise = await getExerciseInfo(record.id);
                            setSearchResults(prevResults => prevResults.map(r => (r.id === exercise.id ? Object.assign({...r, ...exercise}) : r)));
                            setExpandedKeys(prevResults => [...prevResults, record.id]);
                        } 
                        else setExpandedKeys(prevResults => prevResults.filter(id => record.id !== id))
                    },
                    expandedRowKeys: expandedKeys,
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description ? 
                        record.description.replace(/<\/?[^>]+(>|$)/g, "") : "No description available."}</p>,
                }}
                pagination={{defaultPageSize: 5}}
            />
        </>
    )
};

export default SearchExercises;