import { 
  Button, 
  Card, 
  List, 
  InputNumber, 
  Space, 
  Typography, 
  Badge, 
  Divider,
  Row,
  Col,
  Image 
} from 'antd';
import { 
  ShoppingCartOutlined, 
  PlusOutlined, 
  MinusOutlined, 
  DeleteOutlined,
  ClearOutlined 
} from '@ant-design/icons';
import { useCartStore } from '../stores/cartStore';

const { Title, Text } = Typography;

// 模拟商品数据
const mockProducts = [
  {
    id: 1,
    name: 'MacBook Pro',
    price: 12999,
    image: 'https://via.placeholder.com/100x100?text=MacBook',
    description: '13英寸 M2 芯片'
  },
  {
    id: 2,
    name: 'iPhone 15',
    price: 5999,
    image: 'https://via.placeholder.com/100x100?text=iPhone',
    description: '128GB 蓝色'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 1899,
    image: 'https://via.placeholder.com/100x100?text=AirPods',
    description: '第二代 降噪耳机'
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 4399,
    image: 'https://via.placeholder.com/100x100?text=iPad',
    description: '10.9英寸 WiFi版'
  },
];

export const CartExample = () => {
  const { 
    items, 
    total, 
    itemCount, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getItem 
  } = useCartStore();

  return (
    <Card title="购物车示例 - 复杂状态管理" style={{ margin: '16px 0' }}>
      <Row gutter={[16, 16]}>
        {/* 商品列表 */}
        <Col xs={24} lg={12}>
          <Card 
            title="商品列表" 
            size="small"
            extra={<Text type="secondary">选择商品加入购物车</Text>}
          >
            <List
              dataSource={mockProducts}
              renderItem={(product) => {
                const cartItem = getItem(product.id);
                const inCart = !!cartItem;
                
                return (
                  <List.Item
                    actions={[
                      <Button
                        key="add"
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => addItem(product)}
                      >
                        加入购物车
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge count={inCart ? cartItem.quantity : 0}>
                          <Image
                            width={50}
                            height={50}
                            src={product.image}
                            preview={false}
                            style={{ borderRadius: 4 }}
                          />
                        </Badge>
                      }
                      title={
                        <Space>
                          <span>{product.name}</span>
                          {inCart && <Badge status="success" text="已在购物车" />}
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={0}>
                          <Text type="secondary">{product.description}</Text>
                          <Text strong style={{ color: '#ff4d4f' }}>
                            ¥{product.price.toLocaleString()}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>

        {/* 购物车 */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <ShoppingCartOutlined />
                <span>购物车</span>
                <Badge count={itemCount} style={{ backgroundColor: '#52c41a' }} />
              </Space>
            }
            size="small"
            extra={
              items.length > 0 && (
                <Button 
                  type="link" 
                  danger 
                  size="small"
                  icon={<ClearOutlined />}
                  onClick={clearCart}
                >
                  清空
                </Button>
              )
            }
          >
            {items.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#999' 
              }}>
                <ShoppingCartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <div>购物车是空的</div>
                <Text type="secondary">快去添加一些商品吧～</Text>
              </div>
            ) : (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* 购物车商品列表 */}
                <List
                  size="small"
                  dataSource={items}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          key="remove"
                          type="link"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => removeItem(item.product.id)}
                        >
                          移除
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Image
                            width={40}
                            height={40}
                            src={item.product.image}
                            preview={false}
                            style={{ borderRadius: 4 }}
                          />
                        }
                        title={item.product.name}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text type="secondary">
                              单价: ¥{item.product.price.toLocaleString()}
                            </Text>
                            <Space>
                              <Button
                                type="text"
                                size="small"
                                icon={<MinusOutlined />}
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              />
                              <InputNumber
                                size="small"
                                min={1}
                                value={item.quantity}
                                onChange={(value) => updateQuantity(item.product.id, value || 1)}
                                style={{ width: 60 }}
                              />
                              <Button
                                type="text"
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              />
                            </Space>
                            <Text strong>
                              小计: ¥{(item.product.price * item.quantity).toLocaleString()}
                            </Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />

                <Divider style={{ margin: '12px 0' }} />

                {/* 购物车统计 */}
                <div style={{ 
                  padding: '12px', 
                  background: '#f5f5f5', 
                  borderRadius: 6 
                }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space direction="vertical" size={0}>
                        <Text>商品数量: {itemCount} 件</Text>
                        <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
                          总计: ¥{total.toLocaleString()}
                        </Title>
                      </Space>
                    </Col>
                    <Col>
                      <Button type="primary" size="large">
                        立即结算
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Space>
            )}
          </Card>
        </Col>
      </Row>

      {/* 使用说明 */}
      <div style={{ 
        marginTop: '16px', 
        padding: '16px', 
        background: '#f5f5f5', 
        borderRadius: '6px' 
      }}>
        <Text strong>购物车状态管理特点：</Text>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>自动计算总价和商品数量</li>
          <li>支持数量修改和商品移除</li>
          <li>状态更新时自动重新渲染相关组件</li>
          <li>复杂的派生状态计算</li>
        </ul>
      </div>
    </Card>
  );
};
