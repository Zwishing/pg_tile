import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import { connect, } from 'umi';
// import styles from './FeatureServices.less';
import CardList from '@/pages/CardList';
import MapWindow from '@/pages/MapWindow';
import { useState, useEffect,useCallback} from 'react'


const FeatureServices = (props) => {

  const { dispatch, featureServices } = props;
  const { featureServicesData } = featureServices;
  // const intl = useIntl();
  const [activeId, setActiveId] = useState(-1);// MapWindow开启和关闭的状态

  const handleId = useCallback((id)=>{
      return setActiveId(id)
  },[]);

  useEffect(() => {
    dispatch({
      type: 'featureServices/fetchFeatureServices', // 命名空间（featureServices）下的fetchFeatureServices方法
      payload: null,
    });
  }, []);

  return (
    <PageContainer>
      <Row>
        <Col></Col>
      </Row>
      <Row gutter={[16, 16]}>
        {featureServicesData.data.map((mapInfo, id) => {
          return (
            <Col
              span={6}
              key={id}>
              <CardList
              id = {id}
              mapInfo={mapInfo}
              setActiveId={handleId} />
              {
                activeId===id?
                    <MapWindow
                      id = {id}
                      mapInfo = {mapInfo}
                      setActiveId={(id) => setActiveId(id)} />
                    : null
              }
            </Col>
          )
        })}
      </Row>
    </PageContainer >)
};

export default connect(({ featureServices }) => ({ featureServices }))(FeatureServices);
