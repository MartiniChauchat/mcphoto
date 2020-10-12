import React, { Component } from "react";
import PrivatePhotosViewCard from './PrivatePhotosViewCard';
import moment from 'moment';
import '../css/Editor.css';
import { Collapse, Image, Spin, Row, Col, Divider, Typography, Button, Layout, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Panel } = Collapse;
const { Title } = Typography;
const { Content , Header} = Layout
const { Option } = Select;

const dateFormat = 'YYYY.MM';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 14,
    },
    sm: {
      span: 10,
    },
  },
};

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found:a welcome guest in many households across the world.
  </p>
);

export default class PrivatePhotosViewer extends Component {
    state = {
      artworks:[],
      modalVisible: false
    };

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/arts/getArtworkListByArtistEmail',
      params: { artistEmail: window.localStorage.getItem("loggedInEmail") }
    }).then(res => {
      this.setState( {artworks:res.data} )
    }).catch((err) => console.log(err));
  }

  search = e => {
    console.log(this.state.artworks[e]);
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  cancelModal = e => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { artworks } = this.state;
    return (
      <Layout>
        <Content className={'photosviewer-topbar'}>
          <Button onClick={this.showModal} ghost={true} type="primary" className={'addfile-button'} shape="round" icon={<PlusOutlined />} size={'large'}>
            Add your art !
          </Button>
          <Modal title={'Add a new artwork'} visible={this.state.modalVisible} onCancel={this.cancelModal} >
            <Form
              {...formItemLayout}
              ref={this.formRef}
              name="uploader"
            >
              <Divider>Basic information</Divider>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please input title!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="medium"
                label="Medium"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
                ]}
              >
                <Input.Group compact>
                  <Select defaultValue="Photograph">
                    <Option value="Photograph">Photograph</Option>
                    <Option value="Painting">Painting</Option>
                    <Option value="Sculpture">Sculpture</Option>
                    <Option value="Glass Art">Glass Art</Option>
                    <Option value="Drawing & Illustration">Drawing & Illustration</Option>
                    <Option value="Mixed Media & Collage">Mixed Media & Collage</Option>
                    <Option value="Fibre Arts">Fibre Arts</Option>
                    <Option value="Dolls & Miniatures">Dolls & Miniatures</Option>
                    <Option value="Other">Other</Option>
                    <Option value="None">None</Option>
                  </Select>
                </Input.Group>
              </Form.Item>

            </Form>
          </Modal>
        <Collapse accordion bordered={false} className={'image-panel'}>
        {artworks.map((artwork, index) => (
          <Panel header={`${artwork.title}:   
          ${moment(artwork.createTime).format('YYYY.MM.DD')}`}
                 key={index}
                  forceRender={false}>
            <Row justify="space-around" align="middle">
              <Col span={8}>
                <Image
                  width={300}
                  src={`http://localhost:3001/api/v1/arts/getFilepathByTitleArtist?artist=${artwork.artist}&title=${artwork.title}&imageSize=-medium`}
                  placeholder={
                    <Spin />
                  }
                />
              </Col>
              <PrivatePhotosViewCard title={artwork.title} artist={artwork.artist}/>
            </Row>
          </Panel>
        ))
        }
        </Collapse>
        </Content>
      </Layout>
    );
  }
}