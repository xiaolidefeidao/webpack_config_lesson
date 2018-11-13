/**
 *Created by 01369606 on 2018/11/6.
 */
module.exports = function mock(app) {
  app.get('/some/path', (req, res) => {
    res.json({data: 'mock data'})
  })

  // ... 其他的请求 mock
  // 如果 mock 代码过多，可以将其拆分成多个代码文件，然后 require 进来
}