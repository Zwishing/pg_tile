import mapboxgl from 'mapbox-gl';
import { Modal, Row, Col, Table } from 'antd';
import { useEffect,useContext } from 'react';
import defaultSetting from '../../../config/defaultSettings';
import style from './index.less';

mapboxgl.accessToken = 'pk.eyJ1Ijoiemhhbmd3aXNoaW5nIiwiYSI6ImNrcDZhNnZjNzAxMGUyb3MwYmdndzB0c20ifQ.gv8bWHnPA3mj1n_AxyA2vA';

export default (props) => {

    const { id, mapInfo,setActiveId } = props;

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '',
            dataIndex: 'value',
            key: 'value',
          },
    ];

    const data = [
        {
            key:0,
            name:'名称',
            value:mapInfo.cname,
        },
        {
            key:1,
            name:'图层名称',
            value:mapInfo.layer,
        },
        {
            key:2,
            name:'中心点经度',
            value:mapInfo.center[0],
        },
        {
            key:3,
            name:'中心点纬度',
            value:mapInfo.center[1],
        },
        {
            key:4,
            name:'左上经度',
            value:mapInfo.bounds[0],
        },
        {
            key:5,
            name:'左上纬度',
            value:mapInfo.bounds[1],
        },
        {
            key:6,
            name:'右下经度',
            value:mapInfo.bounds[2],
        },
        {
            key:7,
            name:'右下纬度',
            value:mapInfo.bounds[3],
        },
        {
            key:8,
            name:'最小缩放比例',
            value:mapInfo.minzoom,
        },
        {
            key:9,
            name:'最大缩放比例',
            value:mapInfo.maxzoom,
        },
        {
            key:10,
            name:'访问地址',
            value:mapInfo.tileurl,
        },
    ];

    const border = {
        border: `1px solid ${defaultSetting.primaryColor}`,
        borderRadius: '5px',
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            'container': 'map',
            // 'zoom': 3,
            'center': mapInfo.center,
            'bounds': mapInfo.bounds,
            'style': {
                'version': 8,
                'sources': {
                    // 'carto-dark': {
                    //     'type': 'raster',
                    //     'tiles': [
                    //         "http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    //         "http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    //         "http://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    //         "http://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    //     ]
                    // },
                    'postgis-tiles': {
                        'type': 'vector',
                        'tiles': [
                            mapInfo.tileurl
                        ]
                    }

                },
                'layers': [
                    //     {
                    //     'id': 'carto-dark-layer',
                    //     'type': 'raster',
                    //     'source': 'carto-dark',
                    //     'minzoom': 0,
                    //     'maxzoom': 22
                    // },
                    {
                        'id': 'postgis-tiles-layer',
                        'type': 'line',
                        'source': 'postgis-tiles',
                        // ST_AsMVT() uses 'default' as layer name
                        'source-layer': mapInfo.layer,
                        'minzoom': 0,
                        'maxzoom': 22,
                        'paint': {
                            'line-opacity': 0.7,
                            'line-color': 'red',
                            'line-width': 1
                        }
                    }]
            }
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.FullscreenControl(),'bottom-right');
        map.addControl(new mapboxgl.ScaleControl,'bottom-left');

      // eslint-disable-next-line no-underscore-dangle,no-unused-expressions
        map._logoControl && map.removeControl(map._logoControl);//去掉 mapbox logo

    }, []);

    return (
        <Modal
            title={<strong>{mapInfo.cname}矢量瓦片</strong>}
            visible={id !== -1}
            width={1200}
            centered={true}
            footer={null}
            closable={false}
            destroyOnClose={false}
            onCancel={() => setActiveId(-1)}
        >
            <Row>
                <Col span={8}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        showHeader={false}
                        bordered={true}
                        pagination={false}
                        scroll={{y:500}}
                        align = 'center'
                        />
                </Col>
                <Col
                    span={16}
                    style={border}>
                    <div id={'map'} style={{ height: 500 }} />
                </Col>
            </Row>

        </Modal>)

};

