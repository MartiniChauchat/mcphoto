import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaSearch } from 'react-icons/fa';
import { Dropdown } from 'semantic-ui-react';
import Pagination from './Pagination';
import axios from 'axios';
import '../css/Gallery.css';

const priceRanges = [
  {
    key: '0-50$',
    text: '0-50$',
    value: '0-50$'
  },
  {
    key: '50-100$',
    text: '50-100$',
    value: '50-100$'
  },
  {
    key: '100-150$',
    text: '100-150$',
    value: '100-150$'
  },
  {
    key: '150-200$',
    text: '150-200$',
    value: '150-200$'
  },
  {
    key: 'over 200$',
    text: 'over 200$',
    value: 'over 200$'
  },
  {
    key: 'None',
    text: 'None',
    value: 'None'
  }
];

const mediums = [
  {
    key: 'Photograph',
    text: 'Photograph',
    value: 'Photograph'
  },
  {
    key: 'Painting',
    text: 'Painting',
    value: 'Painting'
  },
  {
    key: 'Sculpture',
    text: 'Sculpture',
    value: 'Sculpture'
  },
  {
    key: 'Glass Art',
    text: 'Glass Art',
    value: 'Glass Art'
  },
  {
    key: 'Drawing & Illustration',
    text: 'Drawing & Illustration',
    value: 'Drawing & Illustration'
  },
  {
    key: 'Mixed Media & Collage',
    text: 'Mixed Media & Collage',
    value: 'Mixed Media & Collage'
  },
  {
    key: 'Fibre Arts',
    text: 'Fibre Arts',
    value: 'Fibre Arts'
  },
  {
    key: 'Dolls & Miniatures',
    text: 'Dolls & Miniatures',
    value: 'Dolls & Miniatures'
  },
  {
    key: 'Other',
    text: 'Other',
    value: 'Other'
  },
  {
    key: 'None',
    text: 'None',
    value: 'None'
  }
];

const sortOptions = [
  {
    key: 'price',
    text: 'Price',
    value: 'price'
  },
  {
    key: 'creationTime',
    text: 'Creation Time',
    value: 'creationTime'
  },
  {
    key: 'None',
    text: 'None',
    value: 'None'
  }
];

export default class Gallery extends Component {
  state = {
    totalArtworks: 0,
    currentArtworks: [],
    currentPage: 1,
    totalPages: null
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/arts/artworks'
    }).then(response => {
      this.setState({ totalArtworks: response.data.results });
      console.log(this.state.currentArtworks);
    });
  }

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;

    axios({
      method: 'get',
      url: `http://localhost:3001/api/v1/arts/artworks?page=${currentPage}&limit=${pageLimit}`
    }).then(response => {
      const currentArtworks = response.data.data.artworks;
      console.log(response.data);
      this.setState({ currentPage, currentArtworks, totalPages });
    });
  };

  render() {
    const { totalArtworks, currentArtworks } = this.state;

    return (
      <div>
        <div className="gallery-searchbar">
          <h4 className="filterBy-label">Filter by</h4>
          <Dropdown placeholder="Price" selection options={priceRanges} />
          <Dropdown placeholder="Medium" selection options={mediums} />
          <h4 className="sortBy-label"> Sort by</h4>
          <Dropdown placeholder="Sort" selection options={sortOptions} />

          <Form inline className="searchForm">
            <FormControl
              type="text"
              placeholder="Search keyword"
              className="mr-sm-2"
            />
            <Button variant="outline-info">
              <FaSearch className="searchIcon" />
            </Button>
          </Form>
        </div>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            totalRecords={totalArtworks}
            pageLimit={2}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        </div>
        <div className="artworks">
          {currentArtworks.map((artwork, index) => (
            <Card style={{ width: '25vw' }} key={index}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>{artwork.artist}</Card.Text>
                <Button variant="primary">{artwork.price}</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
