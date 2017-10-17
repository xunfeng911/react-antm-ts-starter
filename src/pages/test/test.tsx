import * as React from 'react';
import { DatePicker, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const maxDate = new Date(nowTimeStamp + 1e7);
const minDate = new Date(nowTimeStamp - 1e7);

// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

function formatDate (date: any) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

// 如果不是使用 List.Item 作为 children
// 组件内需处理 onClick/extra 属性
const CustomChildren = ({ extra, onClick, children }: any) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);

export default class TestPage extends React.Component < any, any > {
  state: any = {
    date: now,
    utcDate: utcNow,
    dpValue: null,
    customChildValue: null,
    visible: false,
  };
  onChange = (date: Date) => {
    window.console.log('onChange', date);
    this.setState({ date });
  }
  onOk = (date: Date) => {
    window.console.log('onOk', date);
  }
  onConditionSelect = (date: Date) => {
    if (date.getMinutes() === 15) {
      alert('15 is invalid');
      return;
    }
    this.setState({ dpValue: date, visible: false });
  }
  render() {
    return (
      <div>
      <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker value={this.state.date} onChange={this.onChange}>
          <List.Item arrow="horizontal">datetime</List.Item>
        </DatePicker>
        <DatePicker mode="date"title="Select Date" extra="Optional" value={this.state.date} onChange={this.onChange}>
          <List.Item arrow="horizontal">date</List.Item>
        </DatePicker>
        <DatePicker mode="time" minuteStep={5} use12Hours={true} value={this.state.date} onChange={this.onChange}>
          <List.Item arrow="horizontal">time</List.Item>
        </DatePicker>
        <DatePicker mode="time" minDate={minDate} maxDate={maxDate} value={this.state.date} onChange={this.onChange}>
          <List.Item arrow="horizontal">limited time</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          locale={enUs}
          format={val => `UTC Time: ${formatDate(val).split(' ')[1]}`}
          value={this.state.utcDate}
          onChange={date => this.setState({ utcDate: date })}
        >
          <List.Item arrow="horizontal">UTC time</List.Item>
        </DatePicker>

        <List.Item extra={this.state.dpValue && formatDate(this.state.dpValue)}>
          <div onClick={() => this.setState({ visible: true })}>condition(cannot select fifteenth minute)</div>
        </List.Item>
        <DatePicker
          visible={this.state.visible}
          value={this.state.dpValue}
          onOk={this.onConditionSelect}
          onDismiss={() => this.setState({ visible: false })}
        />
        <DatePicker
          mode="time"
          format="HH:mm"
          title="Select Time"
          value={this.state.customChildValue}
          onChange={v => this.setState({ customChildValue: v })}
          extra="click to choose"
        >
          <CustomChildren>with customized children</CustomChildren>
        </DatePicker>
      </List>
    </div>
    );
  }
}