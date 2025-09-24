import { 
  Card, 
  Switch, 
  Select, 
  Space, 
  Typography, 
  Divider, 
  Button, 
  Row, 
  Col,
  Alert 
} from 'antd';
import { 
  SettingOutlined, 
  MoonOutlined, 
  SunOutlined, 
  GlobalOutlined,
  FontSizeOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import { useSettingsStore, type Theme, type Language, type FontSize } from '../stores/settingsStore';

const { Title, Text } = Typography;
const { Option } = Select;

export const SettingsExample = () => {
  const {
    theme,
    fontSize,
    language,
    sidebarCollapsed,
    showHeader,
    showFooter,
    animations,
    notifications,
    autoSave,
    
    setTheme,
    setFontSize,
    setLanguage,
    setSidebarCollapsed,
    toggleSidebar,
    setShowHeader,
    setShowFooter,
    setAnimations,
    setNotifications,
    setAutoSave,
    updateSettings,
    resetSettings
  } = useSettingsStore();

  return (
    <Card title="设置管理示例 - 持久化存储" style={{ margin: '16px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* 提示信息 */}
        <Alert
          message="设置自动保存"
          description="所有设置会自动保存到浏览器本地存储，页面刷新后设置依然保持。"
          type="info"
          showIcon
          icon={<SettingOutlined />}
        />

        {/* 外观设置 */}
        <Card title="外观设置" size="small" type="inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text strong>
                  <MoonOutlined /> 主题模式
                </Text>
                <Select
                  value={theme}
                  onChange={(value: Theme) => setTheme(value)}
                  style={{ width: '100%' }}
                >
                  <Option value="light">
                    <Space>
                      <SunOutlined />
                      浅色模式
                    </Space>
                  </Option>
                  <Option value="dark">
                    <Space>
                      <MoonOutlined />
                      深色模式
                    </Space>
                  </Option>
                  <Option value="auto">
                    <Space>
                      <SettingOutlined />
                      跟随系统
                    </Space>
                  </Option>
                </Select>
              </Space>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text strong>
                  <FontSizeOutlined /> 字体大小
                </Text>
                <Select
                  value={fontSize}
                  onChange={(value: FontSize) => setFontSize(value)}
                  style={{ width: '100%' }}
                >
                  <Option value="small">小号字体</Option>
                  <Option value="medium">中号字体</Option>
                  <Option value="large">大号字体</Option>
                </Select>
              </Space>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Text strong>
                  <GlobalOutlined /> 语言设置
                </Text>
                <Select
                  value={language}
                  onChange={(value: Language) => setLanguage(value)}
                  style={{ width: '100%' }}
                >
                  <Option value="zh">简体中文</Option>
                  <Option value="en">English</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 布局设置 */}
        <Card title="布局设置" size="small" type="inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text>折叠侧边栏</Text>
                <Switch
                  checked={sidebarCollapsed}
                  onChange={setSidebarCollapsed}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text>显示页头</Text>
                <Switch
                  checked={showHeader}
                  onChange={setShowHeader}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text>显示页脚</Text>
                <Switch
                  checked={showFooter}
                  onChange={setShowFooter}
                />
              </div>
            </Col>
          </Row>
          
          <Divider style={{ margin: '12px 0' }} />
          
          <Space>
            <Button onClick={toggleSidebar}>
              {sidebarCollapsed ? '展开' : '折叠'}侧边栏
            </Button>
          </Space>
        </Card>

        {/* 用户偏好 */}
        <Card title="用户偏好" size="small" type="inner">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space direction="vertical" size={0}>
                  <Text>动画效果</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    界面过渡动画
                  </Text>
                </Space>
                <Switch
                  checked={animations}
                  onChange={setAnimations}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space direction="vertical" size={0}>
                  <Text>桌面通知</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    系统消息通知
                  </Text>
                </Space>
                <Switch
                  checked={notifications}
                  onChange={setNotifications}
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Space direction="vertical" size={0}>
                  <Text>自动保存</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    编辑内容自动保存
                  </Text>
                </Space>
                <Switch
                  checked={autoSave}
                  onChange={setAutoSave}
                />
              </div>
            </Col>
          </Row>
        </Card>

        {/* 批量操作 */}
        <Card title="批量操作" size="small" type="inner">
          <Space wrap>
            <Button
              onClick={() => updateSettings({
                theme: 'dark',
                fontSize: 'large',
                animations: true,
                notifications: true
              })}
            >
              应用推荐设置
            </Button>
            <Button
              onClick={() => updateSettings({
                theme: 'light',
                fontSize: 'small',
                animations: false,
                notifications: false
              })}
            >
              应用简洁模式
            </Button>
            <Button
              danger
              icon={<ReloadOutlined />}
              onClick={resetSettings}
            >
              重置所有设置
            </Button>
          </Space>
        </Card>

        {/* 当前设置预览 */}
        <Card title="当前设置" size="small" type="inner">
          <Row gutter={[16, 8]}>
            <Col xs={12} sm={6}>
              <Text type="secondary">主题:</Text> {theme}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">字体:</Text> {fontSize}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">语言:</Text> {language}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">侧边栏:</Text> {sidebarCollapsed ? '折叠' : '展开'}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">页头:</Text> {showHeader ? '显示' : '隐藏'}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">页脚:</Text> {showFooter ? '显示' : '隐藏'}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">动画:</Text> {animations ? '开启' : '关闭'}
            </Col>
            <Col xs={12} sm={6}>
              <Text type="secondary">通知:</Text> {notifications ? '开启' : '关闭'}
            </Col>
          </Row>
        </Card>

        {/* 使用说明 */}
        <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
          <Text strong>持久化存储特点：</Text>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>使用 persist 中间件自动持久化</li>
            <li>支持版本控制和数据迁移</li>
            <li>可选择性持久化部分状态</li>
            <li>页面刷新后设置自动恢复</li>
          </ul>
        </div>
      </Space>
    </Card>
  );
};
