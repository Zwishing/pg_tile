import React, { useRef } from 'react';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormRadio,
  ProFormSwitch,
  ProFormSlider,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { message, Upload, Button, Result } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { InboxOutlined } from '@ant-design/icons';
import {connect} from 'umi';
import './PublishServices.css';

const { Dragger } = Upload;

const draggerProps = {
  accept: '.geojson,.zip,.7z,.tar,.kml,',
  name: 'file',
  multiple: true,
  action: 'http://localhost:8001/publish/upload',
  style: {
    marginBottom: 24,
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const PublishServices =() => {
  const formRef = useRef();
  // const intl = useIntl();
  return (
    <PageContainer>
      <ProCard>
        <StepsForm formRef={formRef} onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
        }} formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
          submitter={{
            // eslint-disable-next-line no-shadow
            render: (props) => {
              if (props.step === 0) {
                return (<Button type="primary" onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  let _a;
                  // eslint-disable-next-line no-return-assign,no-cond-assign,no-void
                  return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                  下一步 {'>'}
                </Button>);
              }
              if (props.step === 1) {
                return [
                  <Button key="pre" onClick={() => {
                    // eslint-disable-next-line no-underscore-dangle
                    let _a;
                    // eslint-disable-next-line no-return-assign,no-cond-assign,no-void
                    return (_a = props.onPre) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                    {'<'}上一步
                  </Button>,
                  <Button type="primary" key="goToTree" onClick={() => {
                    // eslint-disable-next-line no-underscore-dangle
                    let _a;
                    // eslint-disable-next-line no-void,no-return-assign,no-cond-assign
                    return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                    发布
                  </Button>,
                ];
              }
              return [
                <Button key="gotoTwo" onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  let _a;
                  // eslint-disable-next-line no-cond-assign,no-return-assign,no-void
                  return (_a = props.onPre) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                  {'<'} 再发一次
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => {
                  // eslint-disable-next-line no-underscore-dangle
                  let _a;
                  // eslint-disable-next-line no-return-assign,no-cond-assign,no-void
                  return (_a = props.onSubmit) === null || _a === void 0 ? void 0 : _a.call(props); }}>
                  查看结果
                </Button>,
              ];
            },
          }}
        >
          <StepsForm.StepForm name="base" title="上传矢量数据" stepProps={{
            description: '',
          }} onFinish={async () => {
            // eslint-disable-next-line no-underscore-dangle
            let _a;
            // eslint-disable-next-line no-cond-assign,no-void
            console.log((_a = formRef.current) === null || _a === void 0 ? void 0 : _a.getFieldsValue());
            await waitTime(2000);
            return true;
          }}>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者拖到到此区域进行上传</p>
              <p className="ant-upload-hint">
                目前只支持geojson、shp（zip、7z、tar）、kml等格式
              </p>
            </Dragger>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="checkbox" title="发布矢量数据" stepProps={{
            description: '',
          }} onFinish={async () => {
            // eslint-disable-next-line no-underscore-dangle
            let _a;
            // eslint-disable-next-line no-void,no-cond-assign
            console.log((_a = formRef.current) === null || _a === void 0 ? void 0 : _a.getFieldsValue());
            return true;
          }}>
            <ProFormRadio.Group name="radio"
                                label="矢量分表-(大数据量时建议分表)"
                                width="lg"
                                options={['0', '2', '4', '6', '8']}
                                defaultValue={'0'}/>
            <ProForm.Group>
              <ProFormSwitch name="switch" label="矢量瓦片缓存" />
              <ProFormSlider
                name="slider"
                label="缓存层级"
                range={true}
                width="lg"
                marks={{
                  0: '1',
                  20: '5',
                  40: '9',
                  60: '13',
                  80: '17',
                  100: '21',
                }}
                defaultValue={['20', '40']}
              />
            </ProForm.Group>
            <ProFormText name="dbname" label="矢量服务名称" />
            {/* <ProFormDatePicker name="datetime" label="记录保存时间" width="sm" /> */}
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="完成发布" stepProps={{
            description: '',
          }}>
            <Result
              status="success"
              title="发布成功"
              subTitle="预计两小时内到账"
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>);
};

export default connect(({ uploadFile }) => ({ uploadFile }))(PublishServices);
