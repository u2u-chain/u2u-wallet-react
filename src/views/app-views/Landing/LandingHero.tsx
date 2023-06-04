import styles from './landing.module.css';
import {Button, Col, Row, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Figure from '@/assets/images/frame1.png';

export default function LandingHero() {
  return <div className={styles.hero}>
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.heroTitlePromo}>
          <Typography.Text className={styles.heroTitle}>
            Supercharge your Web3 Experience
          </Typography.Text>
          <Typography.Text className={styles.heroDescription}>
            Manage all your U2U Tokens, exchange NFTs and explore many applications
          </Typography.Text>
        </div>
        <Link to={'/wallet'}>
          <Button shape={'round'} type={'primary'} size={'large'}>
            Access Your Wallet <ArrowRightOutlined/>
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.figure}>
          <img src={Figure} alt="figure"/>
        </div>
      </Col>
    </Row>
  </div>
}
