-- 1. Create Experts Table (if not exists)
CREATE TABLE IF NOT EXISTS public.experts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    organization VARCHAR(255),
    role VARCHAR(100),
    bio TEXT,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Inbox Items Table (if not exists)
CREATE TABLE IF NOT EXISTS public.inbox_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    priority VARCHAR(10) DEFAULT 'P1',
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    reporter_email VARCHAR(255),
    reporter_name VARCHAR(100),
    reporter_phone VARCHAR(50),
    mapped_object_type VARCHAR(50),
    mapped_object_id UUID,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Seed Experts (20 rows)
INSERT INTO public.experts (name, organization, role, bio, profile_image_url) VALUES
('김전문1', '문화체육관광부 제2차관실', '연구원', '이 분야에서 10년 이상 활동해온 김전문1입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert0'),
('김전문2', '한국문화예술위원회 분과1', '교수', '이 분야에서 10년 이상 활동해온 김전문2입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert1'),
('김전문3', '문화체육관광부 제3차관실', '전문위원', '이 분야에서 10년 이상 활동해온 김전문3입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert2'),
('김전문4', '한국문화예술위원회 분과3', '연구원', '이 분야에서 10년 이상 활동해온 김전문4입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert3'),
('김전문5', '문화체육관광부 제2차관실', '교수', '이 분야에서 10년 이상 활동해온 김전문5입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert4'),
('김전문6', '한국문화예술위원회 분과5', '전문위원', '이 분야에서 10년 이상 활동해온 김전문6입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert5'),
('김전문7', '문화체육관광부 제1차관실', '연구원', '이 분야에서 10년 이상 활동해온 김전문7입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert6'),
('김전문8', '한국문화예술위원회 분과7', '전문위원', '이 분야에서 10년 이상 활동해온 김전문8입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert7'),
('김전문9', '문화체육관광부 제3차관실', '교수', '이 분야에서 10년 이상 활동해온 김전문9입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert8'),
('김전문10', '한국문화예술위원회 분과9', '연구원', '이 분야에서 10년 이상 활동해온 김전문10입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert9'),
('김전문11', '문화체육관광부 제2차관실', '전문위원', '이 분야에서 10년 이상 활동해온 김전문11입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert10'),
('김전문12', '한국문화예술위원회 분과11', '교수', '이 분야에서 10년 이상 활동해온 김전문12입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert11'),
('김전문13', '문화체육관광부 제1차관실', '연구원', '이 분야에서 10년 이상 활동해온 김전문13입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert12'),
('김전문14', '한국문화예술위원회 분과13', '전문위원', '이 분야에서 10년 이상 활동해온 김전문14입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert13'),
('김전문15', '문화체육관광부 제3차관실', '교수', '이 분야에서 10년 이상 활동해온 김전문15입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert14'),
('김전문16', '한국문화예술위원회 분과15', '연구원', '이 분야에서 10년 이상 활동해온 김전문16입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert15'),
('김전문17', '문화체육관광부 제2차관실', '전문위원', '이 분야에서 10년 이상 활동해온 김전문17입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert16'),
('김전문18', '한국문화예술위원회 분과17', '교수', '이 분야에서 10년 이상 활동해온 김전문18입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert17'),
('김전문19', '문화체육관광부 제1차관실', '연구원', '이 분야에서 10년 이상 활동해온 김전문19입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert18'),
('김전문20', '한국문화예술위원회 분과19', '전문위원', '이 분야에서 10년 이상 활동해온 김전문20입니다. 지역문화와 예술생태계 복원에 주력하고 있습니다.', 'https://api.dicebear.com/7.x/notionists/svg?seed=expert19');

-- 4. Seed Inbox Items (20 rows)
INSERT INTO public.inbox_items (type, status, priority, subject, content, reporter_name, reporter_email, reporter_phone) VALUES
('Question', 'New', 'P0', '[오탈자] 어제 올라온 문화정책 0번 글 오타가 있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 0)', '사용자0', 'user0@example.com', '010-1234-0000'),
('Suggestion', 'Triaged', 'P1', '행사 참석 문의 건 1', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 1)', '사용자1', 'user1@example.com', '010-1234-0001'),
('Correction', 'Mapped', 'P2', '행사 참석 단체 문의 2', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 2)', '사용자2', 'user2@example.com', '010-1234-0002'),
('Membership', 'In Progress', 'P0', '지역 소멸 대책 3번에 대해 질문있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 3)', '사용자3', 'user3@example.com', '010-1234-0003'),
('Event', 'Closed', 'P1', '행사 참석 문의 건 4', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 4)', '사용자4', 'user4@example.com', '010-1234-0004'),
('Partnership', 'New', 'P2', '[오탈자] 어제 올라온 문화정책 5번 글 오타가 있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 5)', '사용자5', 'user5@example.com', '010-1234-0005'),
('General', 'Triaged', 'P0', '지역 소멸 대책 6번에 대해 질문있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 6)', '사용자6', 'user6@example.com', '010-1234-0006'),
('Question', 'Mapped', 'P1', '행사 참석 문의 건 7', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 7)', '사용자7', 'user7@example.com', '010-1234-0007'),
('Suggestion', 'In Progress', 'P2', '행사 참석 제안 8', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 8)', '사용자8', 'user8@example.com', '010-1234-0008'),
('Correction', 'Closed', 'P0', '지역 소멸 대책 9번에 대해 질문있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 9)', '사용자9', 'user9@example.com', '010-1234-0009'),
('Membership', 'New', 'P1', '[오탈자] 어제 올라온 문화정책 10번 글 오타가 있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 10)', '사용자10', 'user10@example.com', '010-1234-0010'),
('Event', 'Triaged', 'P2', '행사 참석 문의 건 11', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 11)', '사용자11', 'user11@example.com', '010-1234-0011'),
('Partnership', 'Mapped', 'P0', '지역 소멸 대책 12번에 대해 질문있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 12)', '사용자12', 'user12@example.com', '010-1234-0012'),
('General', 'In Progress', 'P1', '행사 참석 문의 건 13', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 13)', '사용자13', 'user13@example.com', '010-1234-0013'),
('Question', 'Closed', 'P2', '지역 소멸 대책에 대한 일반적 제안 14', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 14)', '사용자14', 'user14@example.com', '010-1234-0014'),
('Suggestion', 'New', 'P0', '[오탈자] 어제 올라온 문화정책 15번 글 오타가 있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 15)', '사용자15', 'user15@example.com', '010-1234-0015'),
('Correction', 'Triaged', 'P1', '행사 참석 문의 건 16', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 정정이 필요해 보입니다. (문의 번호: 16)', '사용자16', 'user16@example.com', '010-1234-0016'),
('Membership', 'Mapped', 'P2', '행사 참석 신청 17', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 17)', '사용자17', 'user17@example.com', '010-1234-0017'),
('Event', 'In Progress', 'P0', '지역 소멸 대책 18번에 대해 질문있습니다', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 18)', '사용자18', 'user18@example.com', '010-1234-0018'),
('Partnership', 'Closed', 'P1', '행사 참석 제휴 건 19', '안녕하세요, 시스템을 이용하다가 제보드립니다. 이 부분에 대한 명확한 답변이나 정정이 필요해 보입니다. 확인 후 처리 부탁드립니다. (문의 번호: 19)', '사용자19', 'user19@example.com', '010-1234-0019');
