import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Alert, Typography, Row, Col, Select, Form, Button} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './FeatureServices.less';
import MonacoEditor from 'react-monaco-editor';
import {useState} from "react";
import defaultSetting from "../../config/defaultSettings";

const {Option} = Select;
const border = {
  border: `1px solid ${defaultSetting.primaryColor}`,
  borderRadius: '1px',
};
const defaultCode=
  `CREATE OR REPLACE
FUNCTION public.countries_name(
            z integer, x integer, y integer,
            name_prefix text default 'B')
RETURNS bytea
AS $$
    WITH
    bounds AS (
      SELECT ST_TileEnvelope(z, x, y) AS geom
    ),
    mvtgeom AS (
      SELECT ST_AsMVTGeom(ST_Transform(t.geom, 3857), bounds.geom) AS geom,
        t.name
      FROM ne_50m_admin_0_countries t, bounds
      WHERE ST_Intersects(t.geom, ST_Transform(bounds.geom, 4326))
      AND upper(t.name) LIKE (upper(name_prefix) || '%')
    )
    SELECT ST_AsMVT(mvtgeom, 'public.countries_name') FROM mvtgeom;
$$
LANGUAGE 'sql'
STABLE
PARALLEL SAFE;

COMMENT ON FUNCTION public.countries_name IS 'Filters the countries table by the initial letters of the name using the "name_prefix" parameter.';`
export default () => {
  const intl = useIntl();
  const [code, useCode] = useState(defaultCode)
  return (
    <PageContainer>
      <Card>
        <Row>
          <Col span={6}>
            <p>函数编辑器：通过编写sql函数，生成函数服务，下面提供常见的函数服务列表：</p>
          </Col>
          <Col span={6} offset={1}>
            <Form>
              <Form.Item label={'语言'}>
                <Select defaultValue={'plpgsql'}>
                  <Option value={'plpgsql'}>plpgsql</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6} offset={1}>
            <Form>
              <Form.Item label={'主题'}>
                <Select defaultValue={'vs-light'}>
                  <Option value={'vs-light'}>vs-light</Option>
                  <Option value={'vs-dark'}>vs-dark</Option>
                  <Option value={'vs-contrast-dark'}>vs-contrast-dark</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col span={2} offset={2}>
            <Button.Group>
              {/*<Button type='primary'>验证</Button>*/}
              <Button type='primary'>发布</Button>
            </Button.Group>
          </Col>
        </Row>
        <Row>
          <Col span ={6}>

          </Col>
          <Col span={18} style={border}>
            <MonacoEditor
              height={430}
              language="javascript"
              theme="vs-contrast-dark"
              value={code}
              options={{
                selectOnLineNumbers: true,
                fontSize:16,
              }}
              // onChange={::this.onChange}
              // editorDidMount={::this.editorDidMount}
            />
          </Col>
        </Row>

      </Card>
    </PageContainer>
  );
};
