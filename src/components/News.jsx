import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import React, {useState} from 'react'

import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text, Title} = Typography;

const {Option} = Select

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if(!cryptoNews?.value) return 'Loading...'

  return (
    <Row gutter={[24,24]}>
      {
        cryptoNews.value.map((news, i) => (
          <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
        ))
      }
    </Row>
  )
}

export default News