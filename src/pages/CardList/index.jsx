import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';
import {memo} from 'react';

const CardList = memo((props) => {

    const { Meta } = Card;
    const {id,mapInfo,setActiveId} = props;
    console.log(id,mapInfo);
    return (
        <Card className='cardList'
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <EyeOutlined key="eyeout" onClick = {()=>setActiveId(id)}/>,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            hoverable = {true}
        >
            <Meta
                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={mapInfo.cname}
                description={`${mapInfo.cname}的矢量服务`}
            />
        </Card>
    );
});

export default CardList;
