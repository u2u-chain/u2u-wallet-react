import styles from './landing.module.css';
import {Button, Col, Row, Space, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Figure from '@/assets/images/wallet-figure-01.png';
import Figure1 from '@/assets/images/tokens-card-01.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/pro-solid-svg-icons";

export default function LandingHero() {
  return <div className={styles.hero}>
    <Row gutter={[24, 24]} style={{flex: 1}}>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.heroContent}>
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
              <Space>
                <>
                  Access Your Wallet
                </>
                <FontAwesomeIcon icon={faArrowRight}/>
              </Space>
            </Button>
          </Link>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.figure}>
          <img src={Figure} alt="figure" className={styles.figure1}/>
          <img src={Figure1} alt="figure" className={styles.figure2}/>
        </div>
      </Col>
    </Row>
  </div>
}
