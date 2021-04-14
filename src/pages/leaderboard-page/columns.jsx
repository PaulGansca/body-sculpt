import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import CustomButton from '../../components/antd/custom-button/custom-button';
import CustomSpace from '../../components/antd/custom-space/custom-space';
import CustomInput from '../../components/antd/custom-inputs/custom-input';
import CustomRate from '../../components/antd/custom-rate/custom-rate';
import CustomTooltip from '../../components/antd/custom-tooltip/custom-tooltip';
import CustomBadge from '../../components/antd/custom-badge/custom-badge.jsx';
import { LIFTING_STANDARDS } from '../../workout-creation/lifting-standars';

const handleSearch = (selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

const handleReset = (clearFilters, setSearchText) => {
    clearFilters();
    setSearchText("");
};

const getColumnSearchProps = (dataIndex, searchText, searchedColumn, setSearchText, setSearchedColumn) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <CustomInput
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <CustomSpace>
          <CustomButton
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </CustomButton>
          <CustomButton onClick={() => handleReset(clearFilters, setSearchText)} size="small" style={{ width: 90 }}>
            Reset
          </CustomButton>
          <CustomButton
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </CustomButton>
        </CustomSpace>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

const columns = (exerciseId, searchText, searchedColumn, setSearchText, setSearchedColumn, exerciseCategory) => [
    {
      title: 'Position',
      key: 'position',
      render: (text, record, index) => {
          if(index === 0) return <em style={{fontWeight: 'bold'}}><CustomBadge style={{ backgroundColor: 'gold' }} count={`#${index+1}`} /></em>
          else if(index === 1) return <em style={{fontWeight: 'bold'}}><CustomBadge style={{ backgroundColor: '#C0C0C0' }} count={`#${index+1}`} /></em> 
          else if(index === 2) return <em style={{fontWeight: 'bold'}}><CustomBadge style={{ backgroundColor: '#CD7F32' }} count={`#${index+1}`} /></em> 
          else return <em style={{fontWeight: 'bold'}}><CustomBadge style={{ backgroundColor: '#333' }} count={`#${index+1}`} /></em> 
      },
    },
    {
        title: 'User',
        dataIndex: 'displayName',
        render: (text, record, index) => <em style={{fontWeight: 'bold'}}>{text}</em>,
        ...getColumnSearchProps('displayName', searchText, searchedColumn, setSearchText, setSearchedColumn)
    },
    {
        title: '1 Rep Max',
        key: 'records',
        defaultSortOrder: 'descend',
        sorter: true,
        render: (text, record, index) => <em style={{fontWeight: 'bold'}}>{record.records[exerciseId].max} KGs</em>,
    },
    {
        title: <CustomTooltip title={`Calculates how strong the user is for his weight and gender.`}>
            Strength Rating <InfoCircleOutlined style={{marginLeft: 3, color: 'red'}} /></CustomTooltip>,
        key: 'rating',
        render: (text, record, index) => <em style={{fontWeight: 'bold'}}>
            <CustomRate allowHalf={true} disabled defaultValue={(Math.round(((record.records[exerciseId].max / record.weight / 
            LIFTING_STANDARDS[record.gender][exerciseCategory].advanced) * 10 / 2) * 2 / 2)).toFixed(1)} />
        </em>,
    },
    {
        title: 'Set Performed',
        key: 'set',
        render: (text, record, index) => {
            const { reps, weight } = record.records[exerciseId].set
            return <em style={{fontWeight: 'bold'}}>{reps} Reps x {weight} KGs</em>
        },
    }
];

export default columns;