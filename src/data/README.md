# 디너 데이터 관리

이 폴더는 디너 메뉴와 서빙 스타일 데이터를 중앙 관리합니다.

## 파일 구조

### `menus.ts`
디너 메뉴 정보를 관리합니다.

**메뉴 목록:**
- 발렌타인 디너 (89,000원, 2인)
- 프렌치 디너 (65,000원, 1인)
- 잉글리시 디너 (55,000원, 1인)
- 샴페인 축제 디너 (120,000원, 2인) - grand, deluxe만 가능

**주요 함수:**
- `getDinnerById(id)`: ID로 메뉴 찾기
- `formatPrice(price)`: 가격 포맷팅

### `styles.ts`
서빙 스타일 정보를 관리합니다.

**서빙 스타일 종류:**

#### 1. Simple (심플 스타일)
- 가격 배율: 1.0x (기본)
- 접시: 플라스틱 접시
- 컵: 플라스틱 컵
- 냅킨: 종이 냅킨
- 쟁반: 플라스틱 쟁반
- 와인 잔: 플라스틱 잔

#### 2. Grand (그랜드 스타일)
- 가격 배율: 1.3x (+30%)
- 접시: 도자기 접시
- 컵: 도자기 컵
- 냅킨: 흰색 면 냅킨
- 쟁반: 나무 쟁반
- 와인 잔: 플라스틱 잔

#### 3. Deluxe (디럭스 스타일)
- 가격 배율: 1.6x (+60%)
- 접시: 도자기 접시
- 컵: 도자기 컵
- 냅킨: 린넨 냅킨
- 쟁반: 나무 쟁반
- 와인 잔: 유리 잔
- 추가: 작은 꽃병과 꽃

**주요 함수:**
- `getStyleByType(type)`: 타입으로 스타일 정보 조회
- `calculatePriceWithStyle(basePrice, styleType)`: 스타일 적용된 가격 계산
- `getAvailableStyles(menuId)`: 메뉴에서 사용 가능한 스타일 목록
- `isStyleAvailable(menuId, styleType)`: 특정 스타일 사용 가능 여부 확인

## 사용 예시

```typescript
import { dinnerMenus, formatPrice } from "@/data/menus";
import { calculatePriceWithStyle, getAvailableStyles } from "@/data/styles";

// 메뉴 조회
const menu = dinnerMenus[0]; // 발렌타인 디너

// 사용 가능한 스타일 확인
const availableStyles = getAvailableStyles(menu.id);
// ["simple", "grand", "deluxe"]

// 스타일별 가격 계산
const simplePrice = calculatePriceWithStyle(menu.basePrice, "simple");
// 89,000원 (기본)

const grandPrice = calculatePriceWithStyle(menu.basePrice, "grand");
// 115,700원 (89,000 * 1.3)

const deluxePrice = calculatePriceWithStyle(menu.basePrice, "deluxe");
// 142,400원 (89,000 * 1.6)

// 가격 포맷팅
const formattedPrice = formatPrice(grandPrice);
// "115,700원"
```

## 특별 규칙

- **샴페인 축제 디너 (ID: 4)**는 `grand`와 `deluxe` 스타일만 주문 가능
- 다른 모든 메뉴는 3가지 스타일 모두 선택 가능
- 가격은 항상 `basePrice * priceMultiplier`로 계산

