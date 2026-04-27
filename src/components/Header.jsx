.institutional-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #ffffff;
  border-bottom: 1px solid #e6edf2;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.institutional-header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  gap: 18px;
}

.institutional-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.institutional-brand__logo {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  padding: 6px;
  box-shadow:
    0 6px 18px rgba(15, 23, 42, 0.12),
    inset 0 0 0 1px rgba(15, 23, 42, 0.06);
}

.institutional-brand__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.institutional-brand__content {
  min-width: 0;
}

.institutional-brand__title {
  font-size: 15px;
  font-weight: 800;
  color: #0f172a !important;
  line-height: 1.2;
}

.institutional-brand__subtitle {
  margin-top: 3px;
  font-size: 12px;
  font-weight: 600;
  color: #475569 !important;
  line-height: 1.25;
}

.institutional-meta {
  display: flex;
  align-items: center;
}

.institutional-pill {
  font-size: 12px;
  font-weight: 800;
  background: #eaf7e3;
  color: #2f6f2c !important;
  padding: 7px 12px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(122, 201, 67, 0.18);
  white-space: nowrap;
}
