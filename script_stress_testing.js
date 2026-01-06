import http from 'k6/http';
import { check } from 'k6';


export const options = {
  scenarios: {
    // เพิ่มจำนวนของผู้ใช้ 100 user เป็นเวลา 2 นาที ในช่วงเริ่มต้น
    rps_100: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 200,
    },
    // เพิ่มจำนวนของผู้ใช้ 120 user เป็นเวลา 2 นาที ในช่วงนาทีที่ 2
    rps_120: {
      executor: 'constant-arrival-rate',
      rate: 120,
      timeUnit: '1s',
      startTime: '2m',
      duration: '2m',
      preAllocatedVUs: 240,
    },
    // เพิ่มจำนวนของผู้ใช้ 150 user เป็นเวลา 2 นาที ในช่วงนาทีที่ 4
    rps_150: {
      executor: 'constant-arrival-rate',
      rate: 150,
      timeUnit: '1s',
      startTime: '4m',
      duration: '2m',
      preAllocatedVUs: 300,
    },
    // เพิ่มจำนวนของผู้ใช้ 175 user เป็นเวลา 2 นาที ในช่วงนาทีที่ 6
    rps_175: {
      executor: 'constant-arrival-rate',
      rate: 175,
      timeUnit: '1s',
      startTime: '6m',
      duration: '2m',
      preAllocatedVUs: 350,
    },
  },

  // เงื่อนไขในการทดสอบ
  thresholds: {
    http_req_duration: [
      {
        threshold: 'p(95)<800', // 95% ของ request จะต้องใช้เวลา response น้อยว่า 800 ms
        abortOnFail: true,
        delayAbortEval: '10s',
      },
    ],
    http_req_failed: ['rate<0.01'], // request failed จะต้องน้อยกว่า 1%
  },
};


export default function () {
  const res = http.get(
    'http://api.waqi.info/feed/shanghai/?token=demo',
    {
      headers: {
        Authorization: 'Bearer xxx',
      },
    }
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
