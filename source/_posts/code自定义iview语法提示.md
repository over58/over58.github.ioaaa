---
title: code自定义iview语法提示
author:
  - 徐勇超
tags:
  - js
  - vscode
date: 2019-07-15 23:34:30
categories: [js知识库]
---

vscode 中支持自定义语法提示，于是我就将一些常见的代码模块记录一下，开发时只要输入少量代码就可以获得整个代码块，提高了开发效率。

<!-- more -->

```
'.text.html.vue':
  'button':
    'prefix': 'btn'
    'body':"""
      <Button type="$1"></Button>
    """
  'icon':
    'prefix': 'icon'
    'body':"""
      <Icon type="$1"/>
    """
  'row':
    'prefix': 'row'
    'body':"""
      <Row>
        <Col></Col>
      </Row>
    """
  'col':
    'prefix': 'col'
    'body':"""
      <Col></Col>
    """
  'card':
    'prefix': 'card'
    'body':"""
      <Card dis-hover>
        $1
      </Card>
    """
  'collapse':
    'prefix': 'collapse'
    'body':"""
      <Collapse>
        <Panel name="">
        </Panel>
      </Collapse>
    """
  'Split':
    'prefix': 'split'
    'body':"""
      <Split v-model="split1">
        <div slot="left">
            Left Pane
        </div>
        <div slot="right">
            Right Pane
        </div>
      </Split>
    """
  'divider':
    'prefix': 'divider'
    'body':"""
      <Divider />
    """
  'cell':
    'prefix': 'cell'
    'body':"""
      <Cell title="$1"></Cell>
    """
  'CellGroup':
    'prefix': 'cellgroup'
    'body':"""
      <CellGroup>
        <Cell></Cell>
      </CellGroup>
    """
  'Tabs':
    'prefix': 'tabs'
    'body':"""
      <Tabs>
        <Tabpane label=""></Tabpane>
      </Tabs>
    """
  'Dropdown':
    'prefix': 'dropdown'
    'body':"""
      <Dropdown>
        <Button type="primary">
          下拉菜单
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    """
  'Steps':
    'prefix': 'steps'
    'body':"""
      <Steps :current="1">
        <Step title="$1" content="$2"></Step>
      </Steps>
    """
  'Input -->vue':
    'prefix': 'input'
    'body':"""
      <Input v-model.trim="$1"/>
    """
  "form -->vue":
    "prefix": "form"
    "body": """
      <Form ref="Form" :model="Form" :rules="FormRules" label-position="right">
        <Form-item label="" prop="">
        </Form-item>
        <Form-item>
          <div style="text-align:center">
            <Button type="primary" @click="">提交</Button>
            <Button type="warning" @click="">重置</Button>
          </div>
        </Form-item>
      </Form>
    """
  "form validate-->vue":
    "prefix": "validate"
    "body": """
      this.$refs['$1'].validate((valid) => {
        if (valid) {
          this.$Message.error('表单验证成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
      """
  "form reset-->vue":
    "prefix": "reset"
    "body": """
      this.$refs['$1'].resetFields()
      """
  "formitem -->vue":
    "prefix": "formitem"
    "body": """
      <Form-item label="$1" prop="$2">
      </Form-item>
      """
  "formitem-input -->vue":
    "prefix": "formitem.input"
    "body": """
      <Form-item label="$1" prop="$2">
        <Input v-model="$3"></Input>
      </Form-item>
      """
  "formitem-select -->vue":
    "prefix": "formitem.select"
    "body": """
      <Form-item label="$1" prop="$2">
        select
      </Form-item>
      """
  "formitem-switch -->vue":
    "prefix": "formitem.switch"
    "body": """
      <Form-item label="$1" prop="$2">
        switch
      </Form-item>
      """
  "formitem-radiogroup -->vue":
    "prefix": "formitem.radiogroup"
    "body": """
      radiogroup
      """
  "formitem-checkgroup -->vue":
    "prefix": "formitem.checkgroup"
    "body": """
      checkgroup
      """
  "radio -->vue":
    "prefix": "radio"
    "body": """
      <Radio label="$1">否</Radio>
      """
  "radiogroup -->vue":
    "prefix": "radiogroup"
    "body": """
      <RadioGroup v-model="a">
          <Radio label="">是</Radio>
          <Radio label="">否</Radio>
        </RadioGroup>
      """
  "checkbox -->vue":
    "prefix": "checkbox"
    "body": """
      <Checkbox label="$1"></Checkbox>
      """
  "checkboxgroup -->vue":
    "prefix": "checkboxgroup"
    "body": """
      <CheckboxGroup v-model="$1">
        <Checkbox label="$2">
        </Checkbox>
      </CheckboxGroup>
      """
  "switch -->vue":
    "prefix": "switch"
    "body": """
      <i-switch v-model="" :true-value="" :false-value="">
        <span slot="open">开</span>
        <span slot="close">关</span>
    </i-switch>
      """
  "select -->vue":
    "prefix": "select"
    "body": """
      <Select v-model="$1">
        <Option v-for="(item, index) in List" :value="$2" :key="index">{{$3}}</Option>
      </Select>
      """
  "datepicker -->vue":
    "prefix": "datepicker"
    "body": """
      <DatePicker type="date"></DatePicker>
      """
  "inputnumber -->vue":
    "prefix": "inputnumber"
    "body": """
      <InputNumber v-model="$1"></InputNumber>
      """
  "rate -->vue":
    "prefix": "rate"
    "body": """
      <Rate v-model="$1"></Rate>
      """
  "alert -->vue":
    "prefix": "alert"
    "body": """
      <Alert type=""></Alert>
      """
  "alert.success -->vue":
    "prefix": "alert"
    "body": """
      <Alert type="success"></Alert>
      """
  "alert.warning -->vue":
    "prefix": "alert.warning"
    "body": """
      <Alert type="warning"></Alert>
      """
  "alert.error -->vue":
    "prefix": "alert.error"
    "body": """
      <Alert type="error"></Alert>
      """
  "message -->vue":
    "prefix": "icon"
    "body": """
      this.$Message.info('表单验证失败')
      """
  "message.success -->vue":
    "prefix": "message.success"
    "body": """
      this.$Message.success('表单验证成功！')
      """
  "message.warning -->vue":
    "prefix": "message.warning"
    "body": """
      this.$Message.warning(content: '表单验证失败！')
      """
  "message.error -->vue":
    "prefix": "message.error"
    "body": """
      this.$Message.error('表单验证失败！')
      """
  "message.loading -->vue":
    "prefix": "message.loading"
    "body": """
      this.$Message.loading('表单验证失败！')
      """
  "notice -->vue":
    "prefix": "notice"
    "body": """
      this.$Notice.open({
        title: '',
        desc: ''
      })
      """
  "notice.info -->vue":
    "prefix": "notice.info"
    "body": """
      this.$Notice.info({
        title: '',
        desc: ''
      })
      """
  "notice.success -->vue":
    "prefix": "notice.succes"
    "body": """
      this.$Notice.succes({
        title: '',
        desc: ''
      })
      """
  "notice.warning -->vue":
    "prefix": "notice.warning"
    "body": """
      this.$Notice.warning({
        title: '',
        desc: ''
      })
      """
  "notice.error -->vue":
    "prefix": "notice.error"
    "body": """
      this.$Notice.error({
        title: '',
        desc: ''
      })
      """
  "Modal -->vue":
    "prefix": "modal"
    "body": """
      <Modal v-model="$1ModalVis" title="" :mask-closable="false" @on-cancel="">
      </Modal>
      """
  "Modal.info -->vue":
    "prefix": "modal.info"
    "body": """
      this.$Modal.info({
        title: '',
        content: '',
        onOk () {
        }
      })
      """
  "Modal.success -->vue":
    "prefix": "modal.success"
    "body": """
      this.$Modal.success({
        title: '',
        content: '',
        onOk () {
        }
      })
      """
  "Modal.warning -->vue":
    "prefix": "modal.warning"
    "body": """
      this.$Modal.warning({
        title: '',
        content: '',
        onOk () {
        }
      })
      """
  "Modal.error -->vue":
    "prefix": "modal.error"
    "body": """
      this.$Modal.error({
        title: '',
        content: '',
        onOk () {
        }
      })
      """
  "Modal.confirm -->vue":
    "prefix": "modal.confirm"
    "body": """
      this.$Modal.confirm({
        title: '',
        content: '',
        onOk () {
        }
      })
      """
  "timeline -->vue":
    "prefix": "timeline"
    "body": """
      <Timeline>
          <TimelineItem color=""></TimelineItem>
      </Timeline>
      """
  "timelineitem -->vue":
    "prefix": "timelineitem"
    "body": """
      <TimelineItem color=""></TimelineItem>
      """
  "tag -->vue":
    "prefix": "tag"
    "body": """
      <Tag>$1</Tag>
      """
  "tag.for type='border,dot' -->vue":
    "prefix": "tag.for"
    "body": """
      <Tag v-for="(item, index) in $1" :key="index">{{item.$2}}</Tag>
      """
  "tooptip -->vue":
    "prefix": "tooptip"
    "body": """
      <Tooltip content="">
      </Tooltip>
      """
  "poptip -->vue":
    "prefix": "poptip"
    "body": """
      <Poptip trigger="hover" title="$1" content="$2">
        $3
      </Poptip>
      """
  "carousel -->vue":
    "prefix": "carousel"
    "body": """
      <Carousel v-model="$1" loop>
        <CarouselItem></CarouselItem>
      </Carousel>
      """
  "carouselitem -->vue":
    "prefix": "carouselitem"
    "body": """
        <CarouselItem></CarouselItem>
      """
  "menu -->vue":
    "prefix": "menu"
    "body": """
        <Menu theme="dark">
          <Submenu name="">
            <template slot="title">
            </template>
            <MenuItem name=""></MenuItem>
          </Submenu>
        </Menu>
      """
  "menuitem -->vue":
    "prefix": "menuitem"
    "body": """
        <MenuItem name=""></MenuItem>s
      """
  "drop -->vue":
    "prefix": "drop"
    "body": """
      <Dropdown @on-click="">
        <DropdownMenu slot="list">
          <DropdownItem></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      """
  "breadcrumb -->vue":
    "prefix": "breadcrumb"
    "body": """
      <Breadcrumb>
        <BreadcrumbItem v-for="(item, index) in $1" :key="index" to="$2">$3</BreadcrumbItem>
      </Breadcrumb>
      """
  "circle -->vue":
    "prefix": "circle"
    "body": """
      <Circle :percent="">
      </Circle>
      """
  "backtop -->vue":
    "prefix": "backtop"
    "body": """
      <BackTop></BackTop>
      """
  "spin -->vue":
    "prefix": "spin"
    "body": """
      <Spin></Spin>
      """
  "vue -->vue":
    "prefix": "vue"
    "body": """
      <template>
        <div name="$1">
        </div>
      </template>
      <script>
      let vm = null

      export default {
        components: {
        },
        data () {
          return {
          }
        },
        computed: {
        },
        methods: {
        },
        created () {
          vm = this
          console.log(vm)
        }
      }
      </script>
      <style scoped>
      </style>
      """
  "api -->vue":
    "prefix": "api"
    "body": """
      api.$1($2).then(res => {
        console.log(res)
      }).catch(err => {
        console.log('err', err)
      })
      """
  "columns -->vue":
    "prefix": "columns"
    "body": """
      let $1Col = [
        {
          title: '',
          key: ''
        },
        {
          title: '',
          key: ''
        },
        {
          title: '',
          key: ''
        }
      ]
      """
  "column -->vue":
    "prefix": "column"
    "body": """
      {
        title: '',
        key: ''
      }
      """
  "column.selection -->vue":
    "prefix": "column.selection"
    "body": """
      {
        type: 'selection',
        width: 60,
        align: 'center'
      }
      """
  "column.index -->vue":
    "prefix": "column.index"
    "body": """
      {
        type: 'index',
        width: 60,
        align: 'center'
      }
      """
  "render -->vue":
    "prefix": "render"
    "body": """
      render: (h, params) => {
        return h()
      }
      """
  "render.button -->vue":
    "prefix": "render"
    "body": """
      render: (h, params) => {
        return h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          on: {
            click () {
            }
          }
        }, '查看')
      }
      """
  "rules -->vue":
    "prefix": "rules"
    "body": """
      let $1FormRules = {
        $2: {
          required: true,
          message: '$3不能为空',
          trigger: 'blur'
        },
        $4: {
          required: true,
          message: '$5不能为空',
          trigger: 'blur'
        },
        $6: {
          required: true,
          message: '$7不能为空',
          trigger: 'blur'
        }
      }
      """
  "rule -->vue":
    "prefix": "rule"
    "body": """
        $1: [
          {required: true, message: '$2不能为空', trigger: 'blur'}
        ]
      """
  "import -->vue":
    "prefix": "import"
    "body": """
      import $1 from '@/'
      """
  "func -->vue":
    "prefix": "func"
    "body": """
      function (item) {
        $1
      }
      """
  "dispatch -->vue":
    "prefix": "dispatch"
    "body": """
      this.$store.dispatch('$1')
      """
  "router -->vue":
    "prefix": "router"
    "body": """
      this.$router.push({
        name: '$1'
      })
      """
  "routerview -->vue":
    "prefix": "routerview"
    "body": """
      <router-view></router-view>
      """
  "colorpicker -->vue":
    "prefix": "colorpicker"
    "body": """
      <ColorPicker v-model="$1" />
      """
  "ntable (slot='batch,ouput')-->vue":
    "prefix": "ntable"
    "body": """
      <NTable :nColumns="$1" :nData="$2"></NTable>
      """
  "buttonGroup":
    "prefix": "buttongroup",
    "body": """
      <ButtonGroup>
        <Button type="primary">L</Button>
        <Button type="dashed">R</Button>
      </ButtonGroup>
    """
  "nextTick":
    "prefix": "nextTick",
    "body": """
      this.$nextTick(() => {
      })
    """

```