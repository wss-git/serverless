const { FFScene, FFImage, FFText, FFCreator } = require('ffcreatorlite');


exports.handler = (event, context, callback) => {
  const creator = new FFCreator({
    cacheDir: `${__dirname}/cacheDir`,
    output: `${__dirname}/output/${Math.random()}.mp4`, // outputDir 存在问题，所以使用的 output
    width: 600,
    height: 400,
    log: true,
  });

  // create FFScene
  const scene1 = new FFScene();
  const scene2 = new FFScene();
  scene1.setBgColor('#ff0000');
  scene2.setBgColor('#b33771');

  // scene1
  const fbg = new FFImage({ path: `${__dirname}/public/xhs.png` });
  scene1.addChild(fbg);

  const fimg1 = new FFImage({ path: `${__dirname}/public/wss.png`, x: 300, y: 60 });
  fimg1.addEffect('moveInRight', 1.5, 1.2);
  scene1.addChild(fimg1);

  const text = new FFText({ text: '这是第一屏', font: `${__dirname}/public/jdnt.ttf`, x: 100, y: 100 });
  text.setColor('#ffffff');
  text.setBackgroundColor('#000000');
  text.addEffect('fadeIn', 1, 1);
  scene1.addChild(text);

  scene1.setDuration(8);
  creator.addChild(scene1);

  // scene2
  const fbg2 = new FFImage({ path: `${__dirname}/public/wss.png` });
  scene2.addChild(fbg2);
  // logo
  const flogo = new FFImage({ path: `${__dirname}/public/xhs.png`, x: 100, y: 100 });
  flogo.addEffect('moveInUpBack', 1.2, 0.3);
  scene2.addChild(flogo);

  scene2.setDuration(4);
  creator.addChild(scene2);

  creator.start();

  creator.on('progress', e => {
    console.log(`FFCreatorLite progress: ${(e.percent * 100) >> 0}%`);
  });

  creator.on('complete', e => {
    const o = `FFCreatorLite completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `;
    console.log(o);
    callback(null, o);
  });

  creator.on('error', e => {
    console.error(`FFCreator error: ${JSON.stringify(e)}`);
    callback(`FFCreator error: ${JSON.stringify(e)}`);
  });
}

