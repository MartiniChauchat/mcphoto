import React, { Component } from "react";
import { Col, Row,Typography,Upload, Button, message  } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

const { Title,Paragraph  } = Typography;

export default class PrivatePhotosViewCard extends Component {

  state = {
    currentArtwork:[]
  };

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/arts/getFileInfoByTitleArtist',
      params: { title: this.props.title,
                artist: this.props.artist
      }
    }).then(res => {
      this.setState({currentArtwork:res.data})
    }).catch((err) => console.log(err));
  }

  handleUploadData(){
    let uploadInfo={
      title: this.state.currentArtwork.title,
      artist: this.state.currentArtwork.artist
    }
    return uploadInfo;
  }

  handler = (info) => {
    const status = info.file.status;
    if(status === 'done'){
      axios({
        method: 'get',
        url: 'http://localhost:3001/api/v1/arts/compressByfilepath',
        params: { imagePathReq: info.file.response.path
        }
      }).then(res => {
        console.log(res);
      }).catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <Col span={8}>
        <Row justify="space-around"><Title level={2}>{this.state.currentArtwork.title}</Title></Row>
        <Row justify="space-around"><Title level={4}>by {this.state.currentArtwork.artist}</Title></Row>
        <Row justify="space-around"><Title level={4}>{this.state.currentArtwork.medium} created on {moment(this.state.currentArtwork.creationTime).format('YYYY.MM.DD')}</Title></Row>
        <Row justify="space-around"><Title level={5}>{this.state.currentArtwork.height}cm x {this.state.currentArtwork.width}cm</Title></Row>
        <Row justify="space-around"><Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>{this.state.currentArtwork.description}</Paragraph></Row>
        <Row justify="space-around"><Title level={4}>$ {this.state.currentArtwork.price}</Title></Row>
        <Row justify="space-around">
          <Upload name={'file'}
                  accept={'image/jpeg'}
                  action={'http://localhost:3001/api/v1/arts/uploadFileByTitleArtist'}
                  data={() => this.handleUploadData()}
                  onChange={this.handler}
          > <Button icon={<UploadOutlined />}>Upload .jpeg only</Button></Upload></Row>
      </Col>
      )
  }
}