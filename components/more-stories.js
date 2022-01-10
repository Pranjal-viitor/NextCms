import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostPreview from '../components/post-preview';
import { getAllCategoryData, getAllPostDataByCatId } from '../lib/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MoreStories({ allPosts, posts }) {

  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([])
  const [categoryData, setCategoryData] = useState(posts)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    fetchCategoryData()
  }, [])
  async function fetchCategoryData() {
    let response = await getAllCategoryData()
    if(response && response.length > 0) {
      response = response.filter(item => item && item.node && item.node.id !== "dGVybTox")
      setCategories(response)
    }
  }

  async function handleGetCatDataById(event, catId) {
    let preview = false
    let response = await getAllPostDataByCatId(preview, catId)
    setCategoryData(response.edges)
  }
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <Box sx={{ width: '100%' }} className='blog-categories-container'>
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label="Tabs where each tab needs to be selected manually"
        >
          <Tab label="All Categories" onClick={() => setCategoryData(posts)}  />
          {categories && categories.map(item => (
            <Tab label={item.node.name} onClick={(e) => handleGetCatDataById(e,item.node.databaseId)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-3 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
          {categoryData.map(({ node }) => (
            <PostPreview
              key={node.slug}
              title={node.title}
              coverImage={node.featuredImage?.node}
              date={node.date}
              author={node.author?.node}
              slug={node.slug}
              excerpt={node.excerpt}
            />
          ))}
        </div>
      </TabPanel>
      {categories && categories.map((item, index) => 
        <TabPanel value={value} index={index + 1}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
            {categoryData.map(({ node }) => (
              <PostPreview
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author?.node}
                slug={node.slug}
                excerpt={node.excerpt}
              />
            ))}
          </div>
        </TabPanel>
      )}
    </section>
  )
}

